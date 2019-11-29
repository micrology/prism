
document.getElementById("js-navbar-toggle").addEventListener("click", closeMainNav);

const navMenuItems = document.querySelectorAll(".nav-links");
const closeDropdownMenuSelectingItem = (() => navMenuItems.forEach((item) => item.addEventListener("click", closeMainNav)))();

document.getElementById("openFile").addEventListener("click", getJSONfile);
document.getElementById("saveFile").addEventListener("click", saveJSONfile);
document.getElementById("panelToggle").addEventListener("click", togglePanel);
document.getElementById("addNode").addEventListener("click", plusNode);
document.getElementById("addLink").addEventListener("click", plusLink);
document.getElementById("deleteNode").addEventListener("click", deleteNode);

function closeMainNav() {
    document.getElementById("js-menu").classList.toggle("active");
}

function statusMsg(msg) {
	document.getElementById("statusBar").innerHTML = msg;
}
	
function togglePanel() {
    let container = document.getElementById("container");
    let panel = document.getElementById("panel");
    if (getComputedStyle(document.getElementById("panel")).display == "none") {
        container.style.gridTemplateColumns = "1fr 200px";
        panel.style.display = "block";
    } else {
        container.style.gridTemplateColumns = "1fr 0px";
        panel.style.display = "none";
    }
}

async function getJSONfile() {
    nodes.clear();
    edges.clear();
    fetch('data/BBE2019.json')
        .then(function(response) {
            if (!response.ok) {
                throw new Error("HTTP error, status = " + response.status);
            }
            return response.json();
        })
        .then(function(json) {
            let options = {
                edges: {
                    inheritColors: false
                },
                nodes: {
                    fixed: false,
                    parseColor: true
                }
            };
            let parsed = vis.parseGephiNetwork(json, options);
            nodes.add(parsed.nodes);
            edges.add(parsed.edges);
            data = {
                nodes: nodes,
                edges: edges
            };
            network.setData(data);
        })
        .catch(function(error) {
            statusMsg('Error: ' + error.message)
        });
    return data;
}

function saveJSONfile() {
//TODO
}

function plusNode() {
    statusMsg("Add Node mode");
    document.getElementById("container").style.cursor = "cell";
    network.addNodeMode();
}

function plusLink() {
// TODO
}

function deleteNode() {
    network.deleteSelected();
}

vis.Network.prototype.zoom = function(scale) {
    let newScale = (scale === undefined ? 1 : scale);
    const animationOptions = {
        scale: newScale,
        animation: {
            duration: 300
        }
    };
    this.view.moveTo(animationOptions);
};

function zoomnet() {
    network.zoom(document.getElementById("zoom").value);
}

