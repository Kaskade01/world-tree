const fs = require('fs') // node file system module
const VERTEX = require('./Vertex')

/** 
 * This class function represents a digraph class with edges that connect
 * parent nodes to children nodes.
 * 
 * Code logic is referenced from Algorithms, 4th Edition: 
 * R. Sedgewick and K. Wayne, Algorithms, 4th Edition, Addison-Wesley Professional, 2011.
 * Retrieved from: https://algs4.cs.princeton.edu/42digraph/DepthFirstOrder.java.html
 * */
function Digraph(){
    var data = {
        "number_of_vertices" : null, // number of vertices in digraph
           "number_of_edges" : null, // number of edges in digraph (not including spouses)
                  "vertices" : null, // associative array for vertex objects
          "adjacency_matrix" : null, // 2D adjacency matrix for digraph
                  "indegree" : null  // array for the indegree of each vertex
    }
    
    /**
     * Function that initializes digraph from converted input file
     * @param {string} input_streams - array containing file names to read
     */
    function init_digraph_from_converted_input(input_streams){
        try{
            var i, j; // loop counters

            // read v_contents of input stream
            var v_contents = fs.readFileSync(input_streams[1], 'utf8')

            // parse each line of v_file
            v_contents = v_contents.split("\n")

            // initialize empty vertices list
            data["vertices"] = {}

            // read e_contents of input stream
            var e_contents = fs.readFileSync(input_streams[0], 'utf8')

            // parse each line of e_file
            e_contents = e_contents.split('\n')

            // parse the vertex references on each line
            for(i = 2; i < e_contents.length; i++){
                e_contents[i] = e_contents[i].split(" ")
            }

            // record the number of vertices in digraph
            data["number_of_vertices"] = parseInt(e_contents[0])
            if(data["number_of_vertices"] < 0){
                throw new Error("Number of vertices in a Digraph must be nonnegative")
            }

            // initialize empty arrays for indegree, and matrix
            data["indegree"] = []
            data["adjacency_matrix"] = []

            // parse the references on each line into vertex objects
            for(i = 0; i < v_contents.length; i++){
                v_contents[i] = v_contents[i].split(" ")

                // extract vertex details
                var vertex_pedigree_id = parseInt(v_contents[i][0])
                var vertex_vertex_id = parseInt(v_contents[i][1])
                var vertex_gender = v_contents[i][2]
                
                // generate vertex
                if(data["vertices"][String(vertex_vertex_id)]){
                    throw new Error(input_streams[1] + " has duplicate records...")
                } else {
                    //create the vertex and add it to vertices list in digraph
                    var vertex = VERTEX.Vertex()
                    vertex.intialize_vertex(reduce_number(vertex_vertex_id)-1) // sets vertex id
                    vertex.set_pedigree_id(vertex_pedigree_id)
                    vertex.set_name(String(reduce_number(vertex_vertex_id)))
                    vertex.set_gender(vertex_gender)
                    vertex.set_subject_id(vertex_vertex_id)

                    data["vertices"][String(reduce_number(vertex_vertex_id)-1)] = vertex
                }
            }
            
            // set default values for indegree, and matrix
            for(i = 0; i < data["number_of_vertices"]; i++){
                data["indegree"].push(0)
                var matrix_row = []
                for(j = 0; j < data["number_of_vertices"]; j++){
                    matrix_row.push(null)
                }
                data["adjacency_matrix"].push(matrix_row)
            }

            // add parent-child edges to digiraph
            var edges_from_input = parseInt(e_contents[1])
            if(edges_from_input < 0){
                throw new Error("Number of edges in Digraph must be nonnegative")
            }
            for(i = 2; i < edges_from_input+2; i++){
                // read subject IDs for parent and child
                var parent_vertex_subject_id = parseInt(e_contents[i][0])
                var child_vertex_subject_id = parseInt(e_contents[i][1])

                // reduce the subject_id into vertex_id
                var parent_vertexid = String(reduce_number(parent_vertex_subject_id)-1)
                var child_vertexid = String(reduce_number(child_vertex_subject_id)-1)

                // check to make sure parent and child exist
                if( !(data["vertices"][parent_vertexid]) || !(data["vertices"][child_vertexid]) ){
                    throw new Error("vertices data file does not match edge data file")
                }

                // grab existing parent/child vertices
                var parent_vertex = data["vertices"][parent_vertexid]
                var child_vertex = data["vertices"][child_vertexid]

                // update parent id in child vertex
                if(parent_vertex.get_gender() === 'M'){
                    child_vertex.set_father_id(parent_vertex_subject_id)
                }
                if(parent_vertex.get_gender() === 'F'){
                    child_vertex.set_mother_id(parent_vertex_subject_id)
                }

                // connect the vertices with an edge in the digraph
                add_edge(parent_vertex, child_vertex)
            }

        } catch(error){
            console.log("Digraph Error (10): " + error.message)
            return
        }
    }



    /**
     * Utility function that reduces the subject IDs to a smaller number
     * @param {integer} big_number - the big number that gets reduced
     * @return {integer} small_number - representing minified subject ID
     */
    function reduce_number(big_number){
        // Calculate number of digits to slice by
        var slice_digits = +(String(data["number_of_vertices"]).length)

        // slicing backwards by slice digits to keep minified number
        var small_number = String(big_number).slice(-(slice_digits))
        return parseInt(small_number)
    }

    /**
     * Utility function that validates the ID number of each vertex
     * @param {integer} vertex_id - id number of vertex to be validated
     */
    function validate_vertex_id(vertex_id){
        if(vertex_id < 0 || vertex_id >= data["number_of_vertices"]){
            throw new Error("Vertex ID " + vertex_id + " is not between 0 and " + (data["number_of_vertices"]-1))
        }
    }

    /**
     * Utility function that creates an edge between parent and child vertices
     * @param {vertex} parent_vertex - parent vertex
     * @param {vertex} child_vertex - child vertex
     */
    function add_edge(parent_vertex, child_vertex){
        try{
            // get ids
            var parent_vertex_id = parent_vertex.get_vertex_id()
            var child_vertex_id = child_vertex.get_vertex_id()

            // validate vertices
            validate_vertex_id(parent_vertex_id)
            validate_vertex_id(child_vertex_id)

            // update has_children value in parent vertex
            data["vertices"][String(parent_vertex.get_vertex_id())].set_has_children(true)
            
            // update adjacency matrix
            data["adjacency_matrix"][parent_vertex_id][child_vertex_id] = true
            
            // update the indegree of child vertex
            data["indegree"][child_vertex_id]++

            // update edge count in digraph
            data["number_of_edges"]++
        } catch(error) {
            console.log("Digraph Error (20): " + error.message)
            return
        }
    }

    /**
     * Return the number of vertices in digraph
     * @return {integer} number of vertices in digraph
     */
    function get_number_of_vertices(){
        return data["number_of_vertices"]
    }

    /**
     * Return the number of edges in digraph
     * @return {integer} number of edges in digraph
     */
    function get_number_of_edges(){
        return data["number_of_edges"]
    }

    /**
     * Return the array of vertex objects in digraph
     * @return {vertex[]} array holding all vertices in digraph
     */
    function get_vertices(){
        return data["vertices"]
    }

    /**
     * Return the parent-child adjacency matrix
     * @return {[][]} 2d adjacency matrix
     */
    function get_adjacency_matrix(){
        return data["adjacency_matrix"]
    }

    /**
     * Return the indegree list
     * @return {integer[]} array containing indegree of all vertices
     */
    function get_indegree(){
        return data["indegree"]
    }

    /**
     * Return all digraph data
     * @return {data} data container for everything in digraph
     */
    function get_data(){
        return data
    }
    
    /**
     * Return list of vertices adjacent from vertex V in the digraph
     * @param {integer} V - the vertex's id
     * @return {integer}[] - array containing the list of vertices adjacent to V
     */
    function get_adjacent(V){
        var adjacent_vertices = []
        
        var matrix_column = 0
        data["adjacency_matrix"][V].forEach(boolean_value => {
            if(boolean_value === true){
                adjacent_vertices.push(matrix_column)
            }
            matrix_column++
        });

        // console.log("V_"+V + " " +adjacent_vertices.join(', ')) // debugging
        return adjacent_vertices        
    }

    return Object.freeze({
        init_digraph_from_converted_input,

        // getters
        get_number_of_vertices, get_number_of_edges, get_vertices,
        get_adjacency_matrix, get_indegree, get_data, get_adjacent
    })
}

module.exports.Digraph = Digraph