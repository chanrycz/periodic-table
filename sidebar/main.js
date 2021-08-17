const main = document.querySelector("main");
const modal = document.querySelector(".sidebar-container");
const filterLabel = document.querySelectorAll(".filter-container .label");
var modal_open = false;

const elementGroups = [
	"nonmetals",
	"noble gases",
	"alkali metals",
	"alkaline earth metals",
	"metalloids",
	"halogens",
	"transition metals",
	"post-transition metals",
	"lanthanoids",
	"actinoids",
	"unknown"
];

arrSum = function(arr){
  return arr.reduce(function(a,b){
    return a + b
  }, 0);
}

var matm;

// Set element color
function setElementRGB(category) {
	switch (category) {
		case "nonmetals":
			return '225, 40, 10';
		case "noble gases":
			return '225, 95, 0';
		case "alkali metals":
			return '30, 135, 20';
		case "alkaline earth metals":
			return '0, 116, 205';
		case "metalloids":
			return '75, 0, 130';
		case "halogens":
			return '178, 80, 188';
		case "transition metals":
			return '46, 139, 87';
		case "post-transition metals":
			return '25, 55, 100';
		case "lanthanoids":
			return '125, 142, 42';
		case "actinoids":
			return '0, 128, 128';
		case "unknown":
		    return '107, 107, 107';
		default:
			return '0, 0, 0';
	}
}

// Create XMLHttpRequest to fetch JSON data
const xhttp = new XMLHttpRequest();
xhttp.overrideMimeType("application/json");
xhttp.onreadystatechange = function () {
	if (xhttp.readyState == 4 && xhttp.status == "200") {
		const periodicTableData = JSON.parse(xhttp.responseText);
		// Create a separate container for each element
		periodicTableData.elements.forEach(element => {
			const appendedElementContainer = document.createElement('section');
			appendedElementContainer.className = `element element-${element.atomicNumber}`;

			const appendedElementLeftInfo = document.createElement("section");
			appendedElementLeftInfo.className = "left-info";

			const appendedElementNumber = document.createElement('span');
			appendedElementNumber.innerHTML = element.atomicNumber;
			appendedElementNumber.className = `number`;

			const appendedElementSymbol = document.createElement('span');
			appendedElementSymbol.innerHTML = element.symbol;
			appendedElementSymbol.className = `symbol`;
			appendedElementSymbol.style.color = `rgb(${setElementRGB(element.groupBlock)})`;

			const appendedElementName = document.createElement('span');
			appendedElementName.innerHTML = element.name;
			appendedElementName.className = `name`;

			const appendedElementMass = document.createElement('span');
			appendedElementMass.innerHTML = element.atomicMass;
			appendedElementMass.className = `mass`;

			appendedElementLeftInfo.appendChild(appendedElementNumber);
			appendedElementLeftInfo.appendChild(appendedElementSymbol);
			appendedElementLeftInfo.appendChild(appendedElementName);
			appendedElementLeftInfo.appendChild(appendedElementMass);

			const appendedElementRightInfo = document.createElement('div');
			appendedElementRightInfo.className = "right-info";

			element.shells.forEach(shellNumber => {
				const shell = document.createElement('span');
				shell.innerHTML = shellNumber;
				appendedElementRightInfo.appendChild(shell);
			});

			appendedElementContainer.appendChild(appendedElementLeftInfo);
			appendedElementContainer.appendChild(appendedElementRightInfo);

			Object.assign(appendedElementContainer.style, {
				gridRow: element.ypos,
				gridColumn: element.xpos,
				backgroundColor: `rgba(${setElementRGB(element.groupBlock)}, 0)`,
				borderColor: `rgb(${setElementRGB(element.groupBlock)})`
			});
			
			appendedElementContainer.addEventListener('mouseover', function () {
				appendedElementContainer.style.backgroundColor = "rgba(255, 255, 255, .65)";
				document.querySelector(".preview").style.borderBottomColor = `rgba(${setElementRGB(element.groupBlock)}, .6)`;
				document.querySelector(".preview .symbol").style.color = `rgb(${setElementRGB(element.groupBlock)})`;
				document.querySelector(".preview .number").innerHTML = element.atomicNumber;
				document.querySelector(".preview .symbol").innerHTML = element.symbol;
				document.querySelector(".preview .name").innerHTML = element.name;
				document.querySelector(".preview .mass").innerHTML = element.atomicMass;
				document.querySelector(".preview .right-info").innerHTML = "";
				element.shells.forEach(shellNumber => {
					const shell = document.createElement('span');
					shell.innerHTML = shellNumber;
					document.querySelector(".preview .right-info").appendChild(shell);
				});
				filterLabel.forEach(group => {
					const groupLabelHTML = group.textContent.toLowerCase();
					if(groupLabelHTML === element.groupBlock) {
						group.style.backgroundColor = "rgba(255, 255, 255, .65)";
					}
				});
			});

			appendedElementContainer.addEventListener('mouseout', function () {
				appendedElementContainer.style.backgroundColor = `rgba(${setElementRGB(element.groupBlock)},0)`;
				filterLabel.forEach(group => {
					const groupLabelHTML = group.textContent.toLowerCase();
					if(groupLabelHTML === element.groupBlock) {
						group.style.backgroundColor = `rgba(${setElementRGB(element.groupBlock)},0)`;
					}
				});
			});

			appendedElementContainer.addEventListener('click', function () {
			    if(modal_open === false){
				document.querySelector(".sidebar-container").classList.add("open");
				document.querySelector(".sidebar").style.color = `rgb(${setElementRGB(element.groupBlock)})`;
				document.querySelector(".sidebar .notation .number").innerHTML = element.atomicNumber;
				document.querySelector(".sidebar .notation .symbol").innerHTML = element.symbol;
				document.querySelector(".sidebar .notation .mass").innerHTML = element.atomicMass;
				var test = element.groupBlock;
				if(test == "unknown") {
				    document.querySelector(".sidebar .group").innerHTML = test;
				} else if(test == "noble gases") {
				    document.querySelector(".sidebar .group").innerHTML = test.slice(0,-2);
				} else {
				    document.querySelector(".sidebar .group").innerHTML = test.slice(0,-1);
				}
				document.querySelector(".sidebar .name").innerHTML = element.name;
				document.querySelector(".sidebar .summary").innerHTML = element.summary;
				document.querySelector(".sidebar .more-info .standard-state").innerHTML = element.standardState ? element.standardState : "-";
				document.querySelector(".sidebar .more-info .bonding-type").innerHTML = element.bondingType ? element.bondingType : "-";
				document.querySelector(".sidebar .more-info .ion-radius").innerHTML = element.ionRadius ? element.ionRadius : "-";
				document.querySelector(".sidebar .more-info .atomic-radius").innerHTML = element.atomicRadius ? element.atomicRadius : "-";
				document.querySelector(".sidebar .more-info .electronic-configuration").innerHTML = element.electronicConfiguration ? element.electronicConfiguration : "-";
				document.querySelector(".sidebar .more-info .electronegativity").innerHTML = element.electronegativity ? element.electronegativity : "-";
				document.querySelector(".sidebar .more-info .ionization-energy").innerHTML = element.ionizationEnergy ? element.ionizationEnergy : "-";
				document.querySelector(".sidebar .more-info .electron-affinity").innerHTML = element.electronAffinity ? element.electronAffinity: "-";
				document.querySelector(".sidebar .more-info .oxidation-states").innerHTML = element.oxidationStates ? element.oxidationStates: "-";
				document.querySelector(".sidebar .more-info .density").innerHTML = element.density ? element.density : "-";
				document.querySelector(".sidebar .more-info .melting-point").innerHTML = element.meltingPoint ? `${element.meltingPoint}&deg;K` : "-";
				document.querySelector(".sidebar .more-info .boiling-point").innerHTML = element.boilingPoint ? `${element.boilingPoint}&deg;K` : "-";
				document.querySelector(".sidebar .more-info .year-discovered").innerHTML = element.yearDiscovered ? element.yearDiscovered : "-";
				document.querySelector(".sidebar .more-info .diatomic").innerHTML = element.diatomic ? element.diatomic : "-";
				document.querySelector(".sidebar .more-info .neutron-num").innerHTML = element.neutronNumber ? element.neutronNumber : "Unknown";
				document.querySelector(".sidebar .more-info .shells").innerHTML = "";
				setTimeout(function(){
				matm = new Atom({
                  containerId: '.electron-container',
                  numElectrons: arrSum(element.shells),
                  nucleusColor: 'rgba(0,0,0,0)',
                  nucleusRadius: 1,
                  electronRadius: 2.5,
                  electronColor: `rgb(${setElementRGB(element.groupBlock)})`,
                  orbitalSpacing: 8,
                  orbitalWidth: 0.5,
                  orbitalColor: 'black',
                  idNumber: 1,
                  animationTime: 2000,
                  rotateConfig: {speed: 25, clockwise: true},
                  orbitalRotationConfig: {
                    pattern: {
                      alternating: false,
                      clockwise: true,
                      preset: 'uniform',
                    }
                  },
                  symbolOffset: 8, // When modifying nucleus radius this may need adjusting
                  drawSymbol: true // Render atomic symbol or not
                })
				}, 100);
				element.shells.forEach((shell, shellPos) => {
					const shellNum = shellPos + 1 < element.shells.length ? `${shell}, ` : shell;
					const initialText = document.querySelector(".sidebar .more-info .shells").textContent;
					document.querySelector(".sidebar .more-info .shells").innerHTML = `${initialText}${shellNum}`;
				});
				modal_open = true;
			    }
			});

			elementGroups.forEach((group, key) => {
				const groupLabelElement = filterLabel[key];
				const groupLabelHTML = groupLabelElement.textContent.toLowerCase();
				if(groupLabelHTML === group) {
					Object.assign(groupLabelElement.style, {
						backgroundColor: `rgba(${setElementRGB(groupLabelHTML)}, 0)`,
						borderColor: `rgb(${setElementRGB(groupLabelHTML)})`
					});
				}
				groupLabelElement.addEventListener("mouseover", function () {
					groupLabelElement.style.backgroundColor = "rgba(255, 255, 255, .65)";
					if(element.groupBlock === groupLabelHTML) {
						document.querySelector(`main .element.element-${element.atomicNumber}`).style.textShadow = "0 0 0.4vw currentColor";
						document.querySelector(`main .element.element-${element.atomicNumber}`).classList.add("sel-elem");
					} else {
					    document.querySelector(`main .element.element-${element.atomicNumber}`).classList.add("bg-damp");
					    var spLabels = document.querySelectorAll('.sp-label');
                        for (var i = 0; i < spLabels.length; i++) {
                            spLabels[i].classList.add('bg-damp');
                        }
                        var gpLabels = document.querySelectorAll('.gp-label');
                        for (var i = 0; i < gpLabels.length; i++) {
                            gpLabels[i].classList.add('bg-damp');
                        }
					}
				});
				groupLabelElement.addEventListener("mouseout", function () {
					groupLabelElement.style.backgroundColor = `rgba(${setElementRGB(groupLabelHTML)},0)`;
					if(element.groupBlock === groupLabelHTML) {
						document.querySelector(`main .element.element-${element.atomicNumber}`).style.textShadow = `none`;
						document.querySelector(`main .element.element-${element.atomicNumber}`).classList.remove('sel-elem');
					} else {
					    document.querySelector(`main .element.element-${element.atomicNumber}`).classList.remove("bg-damp");
					    var spLabels = document.querySelectorAll('.sp-label');
                        for (var i = 0; i < spLabels.length; i++) {
                            spLabels[i].classList.remove('bg-damp');
                        }
                        var gpLabels = document.querySelectorAll('.gp-label');
                        for (var i = 0; i < gpLabels.length; i++) {
                            gpLabels[i].classList.remove('bg-damp');
                        }
					}
				});
			});

			main.appendChild(appendedElementContainer);
		});
	}
};
xhttp.open('GET', 'elements_data.json', true);
xhttp.send();

const modalCloseButton = document.querySelector(".sidebar .close-button");
modalCloseButton.addEventListener("click", function () {
    modal_open = false;
	document.querySelector(".sidebar-container").classList.remove("open");
	setTimeout(function(){
    matm.destroy()
    var bohrContainer = document.querySelectorAll(".bohr-svg-container")[0];
    bohrContainer.parentNode.removeChild(bohrContainer);
	}, 1200);
});

document.addEventListener("keyup", function(event) {
  if (event.keyCode == 27) {
    modal_open = false;
	document.querySelector(".sidebar-container").classList.remove("open");
	setTimeout(function(){
    matm.destroy()
    var bohrContainer = document.querySelectorAll(".bohr-svg-container")[0];
    bohrContainer.parentNode.removeChild(bohrContainer);
	}, 1200);
  }
});