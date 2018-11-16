import Digraph from "./classes/Digraph"
import Converter from "./classes/Converter"

var DAG = Digraph()
var converter_thing = Converter()

// convert custom pedigree input to standard input
var converted_input = converter_thing.convert_pedigree_input("200449.txt")

// construct the DAG from the input
DAG.init_Digraph_from_input(converted_input)

// print out the adjacency list of the DAG
console.log(DAG.to_string())