/** 
 * This class function represents a ordering class that returns
 * the ordering of vertices in a digraph. Supports preorder and postorder ordering.
 * 
 * Code logic is referenced from Algorithms, 4th Edition: 
 * R. Sedgewick and K. Wayne, Algorithms, 4th Edition, Addison-Wesley Professional, 2011.
 * Retrieved from: https://algs4.cs.princeton.edu/42digraph/DepthFirstOrder.java.html
 * */
function DepthFirstOrder(){
    var data = {
                 "marked" : null, // {boolean}[v] - has v been marked in dfs?
                    "pre" : null, // {integer}[v] - preorder number of v
                   "post" : null, // {integer}[v] - postorder number of v
         "preorder_queue" : null, // {queue}[integer] - vertices in preorder
        "postorder_queue" : null, // {queue}[integer] - vertices in postorder
            "pre_counter" : null, // counter for preorder numbering
           "post_counter" : null  // counter for postorder numbering
    }

    /**
     * Determines DFS order for digraph G
     * @param {digraph} digraph - the digraph
     */
    function init_DepthFirstOrder(digraph){
        number_of_vertices = digraph.get_number_of_vertices()
        data["pre"] = []
        data["post"] = []
        data["preorder_queue"] = []
        data["postorder_queue"] = []
        data["marked"] = []
        data["pre_counter"] = 0
        data["post_counter"] = 0

        for (var vertex = 0; vertex < number_of_vertices; vertex++){
            if( data["marked"][vertex] != true){
                depth_first_search(digraph, vertex)
            }
        }

        //console.log(data)
    }

    /**
     * Run a depth-first-search in digraph starting from vertex and
     * compute preorder/poster
     * @param {digraph} digraph - the digraph to search
     * @param {vertex} vertex - the starting vertex for the search
     */
    function depth_first_search(digraph, vertex){
        data["marked"][vertex] = true
        data["pre"][vertex] = data["pre_counter"]++
        data["preorder_queue"].push(vertex) // enqueue the vertex in preorder list
        adjacency_vertices = digraph.get_adjacent(vertex) // returns array list of adjacents
        //console.log(adjacency_vertices.join(', '))
        adjacency_vertices.forEach(adjacent_vertex => {
            if( (data["marked"][adjacent_vertex] != true) ){
                depth_first_search(digraph, adjacent_vertex)
            }
        });
        data["postorder_queue"].push(vertex) // enqueue the vertex in postorder list
        data["post"][vertex] = data["post_counter"]++
    }

    /**
     * Returns the vertices in postorder
     * @return {integer}[] vertices list in postorder
     */
    function get_postorder(){
        return data["postorder_queue"]
    }

    /**
     * Returns the vertices in preorder
     * @return {integer}[] vertices list in preorder
     */
    function get_preorder(){
        return data["preorder_queue"]
    }

    return Object.freeze({
        init_DepthFirstOrder,
        get_postorder, get_preorder
    })
}

module.exports.DepthFirstOrder = DepthFirstOrder