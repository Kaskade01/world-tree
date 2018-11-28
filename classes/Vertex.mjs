function Vertex(vertex_id, vertex_name){
    var data = {
        "vertex_id" : vertex_id,
        "pedigree_id" : null,
        "name" : vertex_name,
        "subject_id" : null,
        "father_id" : null,
        "mother_id" : null,
        "gender" : null,
        "has_children" : false,
        "value" : null,
        "incoming": {},
        "incoming_IDs": [],
        "hasOutgoing": false
    }

    // setters for original DAG from ember
    function set_vertex_id(vertex_id){
        data["vertex_id"] = vertex_id
    }
    function get_vertex_id(){
        return data["vertex_id"]
    }
    function set_incoming(incoming_vertexID, incoming_vertex){
        data["incoming"][incoming_vertexID] = incoming_vertex
    }
    function get_incoming(){
        return data["incoming"]
    }
    function set_incoming_IDs(incoming_vertexID){
        data["incoming_IDs"].push(incoming_vertexID)
    }
    function get_incoming_IDs(){
        return data["incoming_IDs"]
    }
    function set_has_outgoing(true_or_false){
        data["hasOutgoing"] = true_or_false
    }
    function get_has_outgoing(){
        return data["hasOutgoing"]
    }

    //setters
    function set_pedigree_id(new_pedigree_id){
        data["pedigree_id"] = new_pedigree_id
    }

    function set_name(new_name){
        data["name"] = new_name
    }

    function set_subject_id(new_subject_id){
        data["subject_id"] = new_subject_id
    }

    function set_father_id(new_father_id){
        data["father_id"] = new_father_id
    }

    function set_mother_id(new_mother_id){
        data["mother_id"] = new_mother_id
    }

    function set_gender(new_gender){
        data["gender"] = new_gender
    }

    function set_has_children(true_or_false){
        data["has_children"] = true_or_false
    }

    function set_value(new_value){
        data["value"] = new_value
    }

    //getters
    function get_pedigree_id(){
        return data["pedigree_id"]
    }

    function get_name(){
        return data["name"]
    }

    function get_subject_id(){
        return data["subject_id"]
    }

    function get_father_id(){
        return data["father_id"]
    }

    function get_mother_id(){
        return data["mother_id"]
    }

    function get_gender(){
        return data["gender"]
    }

    function get_has_children(){
        return data["has_children"]
    }

    function get_value(){
        return data["value"]
    }

    return Object.freeze({
        set_pedigree_id, set_name, set_subject_id, 
        set_father_id, set_mother_id, set_gender, 
        set_has_children, set_value,
        
        get_pedigree_id, get_name, get_subject_id, 
        get_father_id, get_mother_id, get_gender, 
        get_has_children, get_value,

        set_incoming, set_incoming_IDs, set_has_outgoing,
        get_incoming, get_incoming_IDs, get_has_outgoing,

        set_vertex_id, get_vertex_id
    })
}

export default Vertex