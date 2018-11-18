import fs from 'fs'

function Converter(){
    var converted_content = ""

    // this takes the pedigree output files from unknown software
    // and formats them to be compatible with the Digraph input files.
    function convert_pedigree_input(input_stream){
        try{
            var contents = fs.readFileSync(input_stream, 'utf8') // string
            var i, j // loop counters

            function reduce_number(big_number, digits){
                var small_number = String(big_number).slice(-(digits)) //num to string
                return (small_number)-1 // minus 1 because destination starts at 0
            }

            // parse each line
            contents = contents.split('\n')

            // remove the trailing \r from each line
            // also split the incoming data using \t as delimitter
            for(i = 0; i < contents.length; i++){
                contents[i] = contents[i].trim()
                contents[i] = contents[i].split("\t")
                // null out empty parent strings
                for(j = 0; j < contents[i].length; j++){
                    if(contents[i][j] === ''){
                        contents[i][j] = null
                    }
                }
            }

            // remove the header row and the last empty line
            contents.splice(0,1)
            contents.splice(-1,1)
            
            // count the vertices and edges
            var vertices = contents.length
            var splice_digits = +(String(vertices).length)
            var edges = 0
            var temp_buffer = ""
            for(i=0; i < contents.length; i++){
                if(contents[i][2] != null){
                    temp_buffer = temp_buffer + reduce_number(contents[i][2], splice_digits) + " " + reduce_number(contents[i][1], splice_digits) + "\n"
                    edges++
                }
                if(contents[i][3] != null){
                    temp_buffer = temp_buffer + reduce_number(contents[i][3], splice_digits) + " " + reduce_number(contents[i][1], splice_digits) + "\n"
                    edges++
                }
            }

            converted_content = converted_content + vertices + "\n"
            converted_content = converted_content + edges + "\n"
            converted_content = converted_content + temp_buffer

            fs.writeFileSync("converted"+input_stream, converted_content, 'utf8', (err)=>{
                if (err) throw err
                //console.log("conversion complete and output saved")
            })

            return "converted"+input_stream
        } catch(error){
            console.log("(Code60): "+ error.message)
            return
        }
    }

    return Object.freeze({
        convert_pedigree_input
    })
}

export default Converter