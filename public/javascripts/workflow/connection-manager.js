const connectionModule = (function() {
    let links = [];
    return { //exposed to public

        disconnect: function (node) {
            if (node.leaderLine != null) {
                let index = links.indexOf(node.leaderLine);
                if (index !== -1) links.splice(index, 1);
                node.leaderLine.remove();

                // Destroy connections at both ends

                node.connectedNode.connectedElement = null;
                node.connectedNode.leaderLine = null;
                node.connectedNode.connectedNode = null;

                node.connectedElement = null;
                node.leaderLine = null;
                node.connectedNode = null;


                        logicModule.sendSignal();


            }
        },
        createDashedLine: function (start, end, input) {
            // This instantiates a dashed leader-line starting from the component and pointing at the invisible draggable div
            // input boolean selects direction of start and end nodes of leader-line
            if (input) {
                let line = new LeaderLine(LeaderLine.pointAnchor(start), LeaderLine.pointAnchor(end),
                    {
                        startPlug: 'disc',
                        endPlug: 'disc',
                        startSocket: 'left',
                        endSocket: 'right',
                        dash: {animation: true},
                        color: 'rgb(100, 149, 237)'
                    });
                return line;
            }
            else
            {
                let line = new LeaderLine(LeaderLine.pointAnchor(start), LeaderLine.pointAnchor(end),
                    {
                        startPlug: 'disc',
                        endPlug: 'disc',
                        startSocket: 'right',
                        endSocket: 'left',
                        dash: {animation: true},
                        color: 'rgb(100, 149, 237)'

                    });
                return line;
            }
        },
        getLinks: function(){
          return links;
        },
        updateLinks: function () {
            // when this is called all the links update on each frame. This is expensive so it is only called when
            // a user interacts with a move-able object. If performance becomes an issue then this can be changed to
            // only update links that are connected to the moving element but I doubt it will be needed.
            for (x in links)
            {
                links[x].position();
            }
         },
        linksStartColor: function (color)
        {
            for (x in links){
                links[x].color = color;
            }
        },
        addLink: function (line)
        {
            links.push(line);
        },
        connect: function(startNode, endNode){
            // This creates a link between two components at the specified nodes.
            // generate a new line and update the relevant class instances
            line = new LeaderLine(LeaderLine.pointAnchor(startNode.pointer), LeaderLine.pointAnchor(endNode.pointer),
                {startPlug: 'disc', endPlug: 'disc', color: 'rgb(100, 149, 237)'});
            if (startNode.input === true)
            {

                line.setOptions({startSocket: 'left', endSocket: 'right'});
            }
            else
            {

                line.setOptions({startSocket: 'right', endSocket: 'left'});
            }

            connectionModule.addLink(line);
            // apply the connections to both the start and end nodes so that they can independently look after
            // their own inputs and outputs.
            startNode.leaderLine = line;
            startNode.connectedElement = endNode.parent;
            startNode.connectedNode = endNode;

            endNode.leaderLine = line;
            endNode.connectedElement = startNode.parent;
            endNode.connectedNode = startNode;

            databaseConnectorWF.computation();
            // console.log("connect to the server!!!!!!!!");



             logicModule.sendSignal();

        },
        connectionValid: function(startNode, endNode) {
            // Not valid if no node is selected
            if (startNode == null) {
                // console.log("Not valid if no node is selected");
                return false;
            }
            // Not valid if selecting the same node
            if (endNode == startNode) {
                // console.log("Not valid if selecting the same node");
                return false;
            }
            // Not valid if the destination node is already occupied
            if (endNode.connectedElement != null) {
                // console.log("Not valid if the destination node is already occupied");
                return false;
            }
            // Not valid if the destination component is the same as the start component
            if (startNode.parent == endNode.parent) {
                // console.log("Not valid if the destination component is the same as the start component");
                return false;
            }

            // Not valid if nodes are both inputs or nodes are both outputs
            if (endNode.input == startNode.input) {
                // console.log("Not valid if nodes are both inputs or nodes are both outputs");
                return false;
            }
            return true;
        }
    }
}());


