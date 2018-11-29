import fs from 'fs'
import Vertex from "./Vertex.mjs"

function Digraph(){
    // private fields
    var number_of_vertices = null
    var number_of_edges = null
    var vertices = null
    var adjacency_list = null
    var indegree = null 

    // Initialize empty digraph with _V_ vertices
    // params: _V_ the number of vertices
    // throws: IllegalArgumentError if (_V_ < 0)
    function init_Digraph(_number_of_vertices){
        if(_number_of_vertices < 0){
            // throw execption--------------------------------
            console.log("Number of vertices in a Digraph must be nonnegative")
            return
        }
        number_of_vertices = _number_of_vertices
        number_of_edges = 0
        indegree = []
        adjacency_list = {}
        for(var i = 0; i < _number_of_vertices; i++){
            indegree.push(0)
            adjacency_list[i] = []
        }
    }

    // Initialize a digraph from specified input stream
    function init_Digraph_from_input(input_stream){
        try{
            var contents = fs.readFileSync(input_stream, 'utf8')

            // parse each line
            contents = contents.split('\n')
            // parse each pair of vertices (pairs start at index 2)
            for(var i = 2; i < contents.length; i++){
                contents[i] = contents[i].split(" ", 3)
            }
            
            console.log(contents)
            // add vertices
            number_of_vertices = parseInt(contents[0])
            if(number_of_vertices < 0){
                throw new Error("Number of vertices in a Digraph must be nonnegative")
            }
            indegree = []
            adjacency_list = {}
            for(var i = 0; i < number_of_vertices; i++){
                indegree.push(0)
                adjacency_list[i] = []
            }

            function reduce_number(big_number, digits){
                var small_number = String(big_number).slice(-(digits)) //num to string
                return (small_number)-1 // minus 1 because destination starts at 0
            }

            var splice_digits = +(String(number_of_vertices).length)

            // add edges
            var edges_from_input = parseInt(contents[1])
            if(edges_from_input < 0){
                throw new Error("Number of edges in a Digraph must be nonnegative")
            }
            for(var i = 2; i < edges_from_input+2; i++){
                var vertex_start_id = parseInt(contents[i][0])
                var vertex__finish_id = parseInt(contents[i][1])

                var vertex_start_name = reduce_number(vertex_start_id, splice_digits)
                var vertex_finish_name = reduce_number(vertex__finish_id, splice_digits)

                var vertex_start = Vertex(vertex_start_id, vertex_start_name)
                var vertex_finish = Vertex(vertex__finish_id, vertex_finish_name)

                // create new vertex, 
                add_edge(vertex_start, vertex_finish)
            }
        } catch(error){
            console.log("(Code10): "+ error.message)
            return
        }
    }

    function init_Digraph_from_converted(input_stream){
        try{
            var contents = fs.readFileSync(input_stream, 'utf8')

            // parse each line
            contents = contents.split('\n')
            // parse each pair of vertices (pairs start at index 2)
            for(var i = 2; i < contents.length; i++){
                contents[i] = contents[i].split(" ", 3)
            }
            // get rid of last empty line
            contents.splice(-1,1)
            
            console.log(contents) // DEBUG

            // add vertices
            number_of_vertices = parseInt(contents[0])
            if(number_of_vertices < 0){
                throw new Error("Number of vertices in a Digraph must be nonnegative")
            }
            
            indegree = []
            vertices = {}
            adjacency_list = {}
            for(var i = 0; i < number_of_vertices; i++){
                indegree.push(0)
                adjacency_list[i] = []
            }

            function reduce_number(big_number, digits){
                var small_number = String(big_number).slice(-(digits)) //num to string
                return (small_number)-1 // minus 1 because destination starts at 0
            }

            var splice_digits = +(String(number_of_vertices).length)

            // add edges
            var edges_from_input = parseInt(contents[1])
            if(edges_from_input < 0){
                throw new Error("Number of edges in a Digraph must be nonnegative")
            }
            // start reading edges from 3rd line of input
            for(var i = 2; i < edges_from_input+2; i++){
                var vertex_start_id = parseInt(contents[i][0])
                var vertex__finish_id = parseInt(contents[i][1])

                var vertex_start_name = reduce_number(vertex_start_id, splice_digits)
                var vertex_finish_name = reduce_number(vertex__finish_id, splice_digits)

                var vertex_start = Vertex(vertex_start_id, vertex_start_name)
                var vertex_finish = Vertex(vertex__finish_id, vertex_finish_name)

                if( !(vertices[vertex_start_name]) ){
                    vertices[vertex_start_name] = vertex_start
                }
                if( !(vertices[vertex_finish_name]) ){
                    vertices[vertex_finish_name] = vertex_finish
                }

                // create new vertex, 
                add_edge(vertex_start, vertex_finish)
            }
            for(var vertexkey in vertices){
                console.log(vertices[vertexkey].get_name(), vertices[vertexkey].get_vertex_id())
            }
        } catch(error){
            console.log("(Code10): "+ error.message)
            return
        }
    }

    // Initialize a digraph that is a copy of a specified digraph
    function init_digraph_copy(digraph){
        number_of_vertices = digraph.get_number_of_vertices()
        number_of_edges = digraph.get_number_of_edges()
        for(var i = 0; i < vertices; i++){
            indegree[i] = digraph.get_indegree(i)
        }
        for(var j = 0; j < digraph.get_number_of_vertices(); j++){
            reverse = []
            digraph.get_adjacent(j).forEach(adjacent_element => {
                reverse.push(adjacent_element)
            })
            // actually reverse the "reversed" list
            reverse = reverse.reverse();
            reverse.forEach(element => {
                adjacency_list[j].push(element)
            })
        }
    }

    // returns the number of vertices in the digraph
    function get_number_of_vertices(){
        return number_of_vertices
    }

    // returns the number of edges in the digraph
    function get_number_of_edges(){
        return number_of_edges
    }
    
    // throws exception if the vertex number is out of range
    function validate_vertex(vertex){
        if(vertex < 0 || vertex >= number_of_vertices){
            throw new Error("Vertex " + vertex + " is not between 0 and " + (number_of_vertices-1))
        }
    }

    // adds a directed edge between two vertices in the digraph
    function add_edge(tail_vertex, head_vertex){
        try{
            validate_vertex(tail_vertex.get_name())
            validate_vertex(head_vertex.get_name())
            //adjacency_list[tail_vertex].push(head_vertex)  (attempted to use vertex objects instead of vertex names)
            adjacency_list[tail_vertex.get_name()].push(head_vertex.get_name())
            indegree[head_vertex.get_name()]++
            number_of_edges++
        } catch(error){
            console.log("(Code20): "+ error.message)
            return
        }
    }

    // return the vertices adjacent from a vertex in the digraph
    function get_adjacent(vertex){
        try{
            validate_vertex(vertex)
            return adjacency_list[vertex]
        } catch(error){
            console.log("(Code30): "+ error.message)
            return
        }
    }
    
    // return the number of edges going out of a vertex
    function get_outdegree(vertex){
        try{
            validate_vertex(vertex)
            return adjacency_list[vertex].length
        } catch(error){
            console.log("(Code40): "+ error.message)
            return
        }
    }
    
    // return the number of edges going into a vertex
    function get_indegree(vertex){
        try{
            validate_vertex(vertex)
            return indegree[vertex]
        } catch(error){
            console.log("(Code50): "+ error.message)
            return
        }
    }

    // return the reveres of the digraph
    function get_reverse_digraph(){
        var reverse = Digraph()
        reverse.init_Digraph(number_of_vertices)
        for(var i = 0; i < number_of_vertices; i++){
            adjacency_list[i].forEach(adjacent_element => {
                reverse.add_edge(adjacent_element, adjacency_list[i])
            });
        }
        return reverse
    }

    // return a string representation of the digraph
    function to_string(){
        var graph_string = ""
        graph_string = graph_string.concat(String(number_of_vertices) + " vertices, " + String(number_of_edges) + " edges\n")
        for(var i = 0; i < number_of_vertices; i++){
            graph_string = graph_string.concat(String(i)+": ")
            adjacency_list[i].forEach(adjacent_element => {
                graph_string = graph_string.concat(String(adjacent_element)+" ")
            });
            graph_string = graph_string.concat("\n")
        }
        return graph_string
    }

    // for debugging
    function get_adjacency_list(){
        return adjacency_list
    }

    return Object.freeze({
        init_Digraph, init_Digraph_from_input, init_digraph_copy,
        init_Digraph_from_converted,
        get_number_of_vertices, get_number_of_edges, add_edge,
        get_adjacent, get_outdegree, get_indegree,
        get_reverse_digraph, to_string,
        get_adjacency_list
    })
}

export default Digraph