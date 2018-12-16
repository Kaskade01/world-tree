const fs = require('fs') // node file system module

/** 
 * This class function represents a converter class that takes the output pedigree data
 * from other pedigree applications and converts the data into a custom format for data processing. 
 * */
function Converter(){
    var converted_content = "" // holds content of converted file

    /**
     * Function that performs the conversion. This is customized for the 
     * unspecified commercial pedigree application.
     * @param {string} input_stream - file name to read
     * @return {string} converted file name
     */
    function init_from_pedigree_input(input_stream){
        try{
            var i, j // loop counters

            // read contents of input_stream
            var contents = fs.readFileSync(input_stream, 'utf8')
            
            // parse each line of file
            contents = contents.split('\n')

            // remove trailing \r character frome ach line **1
            // also split each line by the \t delimitter **2
            for(i = 0; i < contents.length; i++){
                contents[i] = contents[i].trim() // **1
                contents[i] = contents[i].split("\t") // **2

                // null out empty parent strings in the data
                for(j = 0; j < contents[i].length; j++){
                    if(contents[i][j] === ''){
                        contents[i][j] = null
                    }
                }
            }

            // remove the first row and the last empty line using splice
            contents.splice(0,1) // first line
            contents.splice(-1,1) // last line
            
            // count the vertices
            var vertices = contents.length

            // count the edges
            var edges = 0
            var edge_buffer = ""
            var subject_buffer = ""
            for(i=0; i < contents.length; i++){
                if(contents[i][2] != null){
                    edge_buffer = edge_buffer + contents[i][2] + " " + contents[i][1] + "\n"
                    edges++
                }
                if(contents[i][3] != null){
                    edge_buffer = edge_buffer + contents[i][3] + " " + contents[i][1] + "\n"
                    edges++
                }
                subject_buffer = subject_buffer + contents[i][0] + " " + contents[i][1] + " " + contents[i][4] + "\n"
            }

            // create stream to be saved in converted file
            converted_content = converted_content + vertices + "\n" // vertex count
            converted_content = converted_content + edges + "\n" // edge count
            converted_content = converted_content + edge_buffer // edge list from buffer
            
            // remove the empty line at end of export files
            converted_content = converted_content.slice(0, converted_content.length-1)
            subject_buffer = subject_buffer.slice(0, subject_buffer.length-1)

            // write converted content stream to edge file
            fs.writeFileSync("converted"+input_stream, converted_content, 'utf8', (err)=>{
                if (err) throw err
            })

            // write converted subject file
            fs.writeFileSync("converted-verts"+input_stream, subject_buffer, 'utf8', (err)=>{
                if (err) throw err
            })

            // return converted file input name
            return ["converted"+input_stream, "converted-verts"+input_stream]
        } catch(errror){
            console.log("Converter Error (60): " + error.message)
            return
        }
    }

    return Object.freeze({
        init_from_pedigree_input
    })
}

module.exports.Converter = Converter