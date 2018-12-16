/** 
 * This class function represents a vertex within a directed graph that contains 
 * data fields for a single pedigree subject.
 * */
function Vertex(){
    var data = {
          "vertex_id" : null, // App id for vertex
        "pedigree_id" : null, // id for pedigree tree
               "name" : null, // name of subject
             "gender" : null, // subject's gender
         "subject_id" : null, // subject's id
          "father_id" : null, // subject's father id
          "mother_id" : null, // subject's mother id
       "has_children" : false // boolean flag if subject has children
    }
    
    /**
     * Initializing function for a new vertex.
     * @param {integer} vertex_id - app id for new vertex
     */
    function intialize_vertex(vertex_id){
        data["vertex_id"] = vertex_id
    }

    /**
     * Set vertex application ID.
     * @param {integer} vertex_id - new vertex id value
     */
    function set_vertex_id(vertex_id){
        data["vertex_id"] = vertex_id
    }

    /**
     * Set pedigree ID.
     * @param {integer} new_pedigree_id - new pedigree id value
     */
    function set_pedigree_id(new_pedigree_id){
        data["pedigree_id"] = new_pedigree_id
    }
    
    /**
     * Set subject's name.
     * @param {string} new_name - subject's new name
     */
    function set_name(new_name){
        data["name"] = new_name
    }

    /**
     * Set subject's ID number.
     * @param {integer} new_subject_id - subject's new id value
     */
    function set_subject_id(new_subject_id){
        data["subject_id"] = new_subject_id
    }

    /**
     * Set subject's father ID number.
     * @param {integer} new_father_id - subject's new father id value
     */
    function set_father_id(new_father_id){
        data["father_id"] = new_father_id
    }

    /**
     * Set subject's mother ID number.
     * @param {integer} new_mother_id - subject's new mother id value
     */
    function set_mother_id(new_mother_id){
        data["mother_id"] = new_mother_id
    }

    /**
     * Set subject's gender.
     * @param {string} new_gender - subject's gender
     */
    function set_gender(new_gender){
        data["gender"] = new_gender
    }

    /**
     * Boolean flag if subject has children.
     * @param {boolean} true_or_false - boolean flag
     */
    function set_has_children(true_or_false){
        data["has_children"] = true_or_false
    }

    /**
     * get vertex id.
     * @return {integer} vertex id
     */
    function get_vertex_id(){
        return data["vertex_id"]
    }

    /**
     * get pedigree id.
     * @return {integer} pedigree id
     */
    function get_pedigree_id(){
        return data["pedigree_id"]
    }

    /**
     * get subject's name.
     * @return {string} subject's name
     */
    function get_name(){
        return data["name"]
    }

    /**
     * get subject's id.
     * @return {integer} subject's id
     */
    function get_subject_id(){
        return data["subject_id"]
    }

    /**
     * get subject's father id.
     * @return {integer} subject's father id
     */
    function get_father_id(){
        return data["father_id"]
    }

    /**
     * get subject's mother id.
     * @return {integer} subject's mother id
     */
    function get_mother_id(){
        return data["mother_id"]
    }

    /**
     * get subject's gender.
     * @return {string} subject's gender
     */
    function get_gender(){
        return data["gender"]
    }

    /**
     * get has_children value.
     * @return {boolean} has_children value
     */
    function get_has_children(){
        return data["has_children"]
    }

    /**
     * returns all data in vertex.
     * @return {data} vertex data
     */
    function get_data(){
        return data
    }

    return Object.freeze({
        intialize_vertex, 
        
        // setters
        set_vertex_id, set_pedigree_id, set_name, set_subject_id,
        set_father_id, set_mother_id, set_gender, set_has_children,

        // getters
        get_vertex_id, get_pedigree_id, get_name, get_subject_id,
        get_father_id, get_mother_id, get_gender, get_has_children,
        get_data
    })
}

module.exports.Vertex = Vertex