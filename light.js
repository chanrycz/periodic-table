const main = document.querySelector("main");
const modal = document.querySelector(".modal-container");
const filterLabel = document.querySelectorAll(".filter-container .label");

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
			return '249, 105, 0';
		case "alkali metals":
			return '38, 179, 24';
		case "alkaline earth metals":
			return '0, 116, 205';
		case "metalloids":
			return '225, 179, 0';
		case "halogens":
			return '178, 80, 188';
		case "transition metals":
			return '61, 104, 19';
		case "post-transition metals":
			return '147, 41, 120';
		case "lanthanoids":
			return '94, 67, 61';
		case "actinoids":
			return '0, 128, 128';
		case "unknown":
		    return '45, 45, 45';
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
				backgroundColor: `rgba(${setElementRGB(element.groupBlock)}, 0.1)`,
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
				appendedElementContainer.style.backgroundColor = `rgba(${setElementRGB(element.groupBlock)},0.1)`;
				filterLabel.forEach(group => {
					const groupLabelHTML = group.textContent.toLowerCase();
					if(groupLabelHTML === element.groupBlock) {
						group.style.backgroundColor = `rgba(${setElementRGB(element.groupBlock)},0.1)`;
					}
				});
			});

			appendedElementContainer.addEventListener('click', function () {
				modal.classList.add("visible-model");
				main.classList.add("blur-main");
				document.querySelector(".modal").style.color = `rgb(${setElementRGB(element.groupBlock)})`;
				document.querySelector(".modal .notation .number").innerHTML = element.atomicNumber;
				document.querySelector(".modal .notation .symbol").innerHTML = element.symbol;
				document.querySelector(".modal .notation .mass").innerHTML = element.atomicMass;
				var test = element.groupBlock;
				if(test == "unknown") {
				    document.querySelector(".modal .group").innerHTML = test;
				} else if(test == "noble gases") {
				    document.querySelector(".modal .group").innerHTML = test.slice(0,-2);
				} else {
				    document.querySelector(".modal .group").innerHTML = test.slice(0,-1);
				}
				document.querySelector(".modal .name").innerHTML = element.name;
				document.querySelector(".modal .summary").innerHTML = element.summary;
				document.querySelector(".modal .more-info .standard-state").innerHTML = element.standardState ? element.standardState : "-";
				document.querySelector(".modal .more-info .bonding-type").innerHTML = element.bondingType ? element.bondingType : "-";
				document.querySelector(".modal .more-info .ion-radius").innerHTML = element.ionRadius ? element.ionRadius : "-";
				document.querySelector(".modal .more-info .atomic-radius").innerHTML = element.atomicRadius ? element.atomicRadius : "-";
				document.querySelector(".modal .more-info .electronic-configuration").innerHTML = element.electronicConfiguration ? element.electronicConfiguration : "-";
				document.querySelector(".modal .more-info .electronegativity").innerHTML = element.electronegativity ? element.electronegativity : "-";
				document.querySelector(".modal .more-info .ionization-energy").innerHTML = element.ionizationEnergy ? element.ionizationEnergy : "-";
				document.querySelector(".modal .more-info .electron-affinity").innerHTML = element.electronAffinity ? element.electronAffinity: "-";
				document.querySelector(".modal .more-info .oxidation-states").innerHTML = element.oxidationStates ? element.oxidationStates: "-";
				document.querySelector(".modal .more-info .density").innerHTML = element.density ? element.density : "-";
				document.querySelector(".modal .more-info .melting-point").innerHTML = element.meltingPoint ? `${element.meltingPoint}&deg;K` : "-";
				document.querySelector(".modal .more-info .boiling-point").innerHTML = element.boilingPoint ? `${element.boilingPoint}&deg;K` : "-";
				document.querySelector(".modal .more-info .year-discovered").innerHTML = element.yearDiscovered ? element.yearDiscovered : "-";
				document.querySelector(".modal .more-info .diatomic").innerHTML = element.diatomic ? element.diatomic : "-";
				document.querySelector(".modal .more-info .neutron-num").innerHTML = element.neutronNumber ? element.neutronNumber : "Unknown";
				document.querySelector(".modal .more-info .shells").innerHTML = "";
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
                  drawSymbol: false // Render atomic symbol or not
                })
				element.shells.forEach((shell, shellPos) => {
					const shellNum = shellPos + 1 < element.shells.length ? `${shell}, ` : shell;
					const initialText = document.querySelector(".modal .more-info .shells").textContent;
					document.querySelector(".modal .more-info .shells").innerHTML = `${initialText}${shellNum}`;
				});
			});

			elementGroups.forEach((group, key) => {
				const groupLabelElement = filterLabel[key];
				const groupLabelHTML = groupLabelElement.textContent.toLowerCase();
				if(groupLabelHTML === group) {
					Object.assign(groupLabelElement.style, {
						backgroundColor: `rgba(${setElementRGB(groupLabelHTML)}, 0.1)`,
						borderColor: `rgb(${setElementRGB(groupLabelHTML)})`
					});
				}
				groupLabelElement.addEventListener("mouseover", function () {
					groupLabelElement.style.backgroundColor = "rgba(255, 255, 255, .65)";
					if(element.groupBlock === groupLabelHTML) {
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
					groupLabelElement.style.backgroundColor = `rgba(${setElementRGB(groupLabelHTML)},0.1)`;
					if(element.groupBlock === groupLabelHTML) {
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

const modalCloseButton = document.querySelector(".modal .close-button");
modalCloseButton.addEventListener("click", function () {
	modal.classList.remove("visible-model");
	main.classList.remove("blur-main");
    matm.destroy()
    var bohrContainer = document.querySelectorAll(".bohr-svg-container")[0];
    bohrContainer.parentNode.removeChild(bohrContainer);
});

document.addEventListener("keyup", function(event) {
  if (event.keyCode == 27) {
	modal.classList.remove("visible-model");
	main.classList.remove("blur-main");
    matm.destroy()
    var bohrContainer = document.querySelectorAll(".bohr-svg-container")[0];
    bohrContainer.parentNode.removeChild(bohrContainer);
  }
});

document.addEventListener("click", function (e) {
    if(e.target.id == 'modal-bg') {
    	modal.classList.remove("visible-model");
    	main.classList.remove("blur-main");
        matm.destroy()
        var bohrContainer = document.querySelectorAll(".bohr-svg-container")[0];
        bohrContainer.parentNode.removeChild(bohrContainer);
    }
});