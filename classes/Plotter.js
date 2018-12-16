const fs = require('fs')                             // node file system module
const exec = require('child_process').exec           // node child process module
const DepthFirstOrder = require('./DepthFirstOrder') // DFS function class

/** 
 * This class function represents a plotter class that calculates the positions
 * of each vertex in a layered tree-like structure and outputs the results to a diagraph file.
 * Currently, this class function relies on Graphviz's dot program to generate Sugiyama-style graphs.
 * */
function Plotter(){
    var data = {
        "digraph" : null, // digraph object to plot
        "levels" : null,
    }
    
    /**
     * Function to initialize plotter deta.
     */
    function initialize_plotter(digraph){
        data["digraph"] = digraph
        data["levels"] = []
    }
    
    /**
     * Function that creates a plot using graphviz.
     * @return {string} filename of gv output for graphviz
     */
    function plot_graphviz(){
        try{
            var input_file = 'dotfile.gv'
            var ouput_file = 'plotfile.ps'

            // generate dotfile to plot in graphviz
            generate_dotfile()

            // execute DOT to generate a postscript image
            exec('dot -Tps ' + input_file + '  -o ' + ouput_file, function(err, stdout, stderr){
                console.log(stdout)
            })

            return ouput_file
        } catch(error){
            console.log("Plotter Error (20): " + error.message)
        }
    }

    /**
     * Utility function for converting digraph to graphviz DOT format.
     */
    function generate_dotfile(){
        try{
            var plot_contents = ""
            var male_node_stye = "[shape=box, color=\"blue\", style=\"filled\" fillcolor=\"lightblue\"] ;"
            var female_node_style = "[shape=oval, color=\"red\", style=\"filled\" fillcolor=\"pink\"] ;"
            var ungendered_node_style = "[shape=box, color=\"black\", style=\"filled\" fillcolor=\"grey\"] ;"
            var vertices = data["digraph"].get_vertices()

            // header portion (first 4 lines)
            plot_contents = plot_contents + "digraph G {\n"
            plot_contents = plot_contents + "size =\"8.5,11\";\n"
            plot_contents = plot_contents + "ratio =\"auto\";\n"
            plot_contents = plot_contents + "orientation =\"landscape\";\n"
            plot_contents = plot_contents + "edge [dir=none];\n"
            plot_contents = plot_contents + "node [shape=box];\n"

            // body portion1 (node data)
            for(key in vertices){
                plot_contents = plot_contents + "\""+vertices[key].get_vertex_id()+"\"" + " "
                if(vertices[key].get_gender() === "F"){
                    plot_contents = plot_contents + female_node_style + "\n"
                } else if (vertices[key].get_gender() === "M"){
                    plot_contents = plot_contents + male_node_stye + "\n"
                } else if (vertices[key].get_gender() === "U"){
                    plot_contents = plot_contents + ungendered_node_style + "\n"
                }
            }

            // body portion2 (edge data)
            var DFS = DepthFirstOrder.DepthFirstOrder()
            DFS.init_DepthFirstOrder(data["digraph"])
            var preorder = DFS.get_preorder()
            var edge_op = " -> "
            preorder.forEach(vertex_id => {
                var edge_content = ""
                if(vertices[String(vertex_id)].get_has_children()){
                    var children = data["digraph"].get_adjacent(vertex_id)
                    children.forEach(child_vertex => {
                        edge_content += vertex_id + edge_op + child_vertex + "\n"
                    });
                }
                plot_contents = plot_contents + edge_content 
            });

            // footer portion (last line)
            plot_contents = plot_contents + "}"

            // write the dot file
            fs.writeFileSync("dotfile.gv", plot_contents, 'utf8', (err)=>{
                if (err) throw err
            })
        } catch(error){
            console.log("Plotter Error (30): " + error.message)
            return
        }
    }

    return Object.freeze({
        initialize_plotter, plot_graphviz
    })
}

module.exports.Plotter = Plotter