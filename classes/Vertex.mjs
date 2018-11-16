function Vertex(){
    
    return Object.freeze({
        init_Digraph, init_Digraph_from_input, init_digraph_copy,
        get_number_of_vertices, get_number_of_edges, add_edge,
        get_adjacent, get_outdegree, get_indegree,
        get_reverse_digraph, to_string,
        get_adjacency_list
    })
}

export default Vertex