import RNA
import sys
import json 
rvv = RNA.simple_xy_coordinates(sys.argv[2])
jsonStructure = {'graphPoints':[]}
ptable = RNA.ptable(sys.argv[2])
for x in range(0,len(rvv)-1):
    dataCoordinate = {'base':sys.argv[1][x], 'X':rvv[x].X, 'Y':rvv[x].Y, 'connector':ptable[x+1]}
    jsonStructure['graphPoints'].append(dataCoordinate);
print(json.dumps(jsonStructure, indent=4, separators=(',',':')))
