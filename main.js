// {PROGRAM INPUT} - CHANGE THESE
const input_file = '200449.txt'

// {MAIN PROGRAM LOGIC} - DO NOT CHANGE ANYTHING HERE
const Converter = require('./classes/Converter')
const Digraph = require('./classes/Digraph')
const Plotter = require('./classes/Plotter')
const DepthFirstOrder = require('./classes/DepthFirstOrder')

// instantiate function classes
var CONVERTER = Converter.Converter()
var DIGRAPH = Digraph.Digraph()
var PLOTTER = Plotter.Plotter()

// convert pedgree output from unknown application to standard input
var converted_input = CONVERTER.init_from_pedigree_input(input_file)
DIGRAPH.init_digraph_from_converted_input(converted_input)
console.log(converted_input[0] + ' saved in project root directory')
console.log(converted_input[1] + ' saved in project root directory')

// generate graphviz plot
PLOTTER.initialize_plotter(DIGRAPH)
var output = PLOTTER.plot_graphviz()
console.log(output + ' saved in project root directory')