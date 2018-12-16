# world-tree
Pedigree drawing program


1.	Download and install Node.js for your system.
https://nodejs.org/en/download/ 

2.	Download and install Graphviz.
https://graphviz.gitlab.io/_pages/Download/Download_source.html

3.	Git cloning the project repository:
https://github.com/Kaskade01/world-tree.git

4.	Navigate to the project root folder and open main.js. Edit the first line to change the input file that the application reads. 
NOTE: The path is not coded to be relative. This means you must put all input files in the project root folder (where main.js is located)

5.	To run the node application for the first time you simply issue these commands from the project directory:
sudo npm install  (only do this once)
npm start

6.	After you run the program, there will be several output files generated in the project root directory:

converted-vertsXXXXX.txt  - contains all the vertices in XXXXX pedigree.

convertedXXXXX.txt  - contains all the edges in XXXXX pedigree

dotfile.gv – contains the dot language commands to draw the pedigree with Graphviz. This file is overwritten after each program execution.

plotfile.ps – contains the rendered pedigree diagram from Graphviz. You will need an application that can open postscript files to view the diagram.

