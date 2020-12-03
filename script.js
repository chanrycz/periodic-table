var view_mode;

function changeTheme(override = "none", initial = false) {
    function changePreview() {
		document.querySelector(".preview").style.borderBottomColor = `rgba(${setElementRGB(previewCurrentElem.groupBlock)}, 0.6)`;
		document.querySelector(".preview .symbol").style.color = `rgb(${setElementRGB(previewCurrentElem.groupBlock)})`;
		document.querySelector(".preview .number").innerHTML = previewCurrentElem.atomicNumber;
		document.querySelector(".preview .symbol").innerHTML = previewCurrentElem.symbol;
		document.querySelector(".preview .name").innerHTML = previewCurrentElem.name;
		document.querySelector(".preview .mass").innerHTML = previewCurrentElem.atomicMass;
		document.querySelector(".preview .right-info").innerHTML = "";
		
		previewCurrentElem.shells.forEach(shellNumber => {
			const shell = document.createElement("span");
			shell.innerHTML = shellNumber;
			document.querySelector(".preview .right-info").appendChild(shell);
		});
    }
    
    function changeDark() {
        document.documentElement.classList.remove("light");
        document.documentElement.classList.add("dark");
        document.getElementById("change-theme").innerText = "Light";
        view_mode = "dark";
        if (initial === false) {
            generateTable();
            changePreview();
        }
    }
    
    function changeLight() {
        document.documentElement.classList.remove("dark");
        document.documentElement.classList.add("light");
        document.getElementById("change-theme").innerText = "Dark";
        view_mode = "light";
        if (initial === false) {
            generateTable();
            changePreview();
        }
    }
    
    if (override === "none") {
        if (view_mode == "dark") {
            changeLight();
        } else {
            changeDark();
        }
    } else if (override == "light") {
        changeLight();
    } else {
        changeDark();
    }
}


var darkModeQuery = window.matchMedia("(prefers-color-scheme: dark)");
if (darkModeQuery.matches) {
    changeTheme("dark", true);
} else {
    changeTheme("light", true);
}

const config = {
    "light": {
    	"elementRGB": {
    		"lanthanoids": "94, 67, 61",
    		"unknown": "45, 45, 45"
    	},
    	"elemBG": {
    		"alpha": "0.1",
    		"hoverBG": "0, 0, 0",
    	},
    	"groupBG": {
    		"alpha": "0.1",
    		"hoverBG": "255, 255, 255",
    	},
    	"atomElem": {
    		"nucleusColor": "0, 0, 0",
    		"electronRadius": 2.5,
    		"orbitalSpacing": 8,
    		"orbitalWidth": 0.5,
    		"orbitalColor": "black",
    	}
    },
    "dark": {
    	"elementRGB": {
    		"lanthanoids": "149, 116, 109",
    		"unknown": "107, 107, 107"
    	},
    	"elemBG": {
    		"alpha": "0.25",
    		"hoverBG": "255, 255, 255",
    	},
    	"groupBG": {
    		"alpha": "0.25",
    		"hoverBG": "0, 0, 0",
    	},
    	"atomElem": {
    		"nucleusColor": "255, 255, 255",
    		"electronRadius": 3.5,
    		"orbitalSpacing": 9,
    		"orbitalWidth": 1,
    		"orbitalColor": "white",
    	}
    }
};

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

arrSum = function(arr) {
	return arr.reduce(function(a, b) {
		return a + b;
	}, 0);
};

var matm;

// Set element color
function setElementRGB(category) {
	switch (category) {
		case "nonmetals":
			return "225, 40, 10";
		case "noble gases":
			return "249, 105, 0";
		case "alkali metals":
			return "38, 179, 24";
		case "alkaline earth metals":
			return "0, 116, 205";
		case "metalloids":
			return "225, 179, 0";
		case "halogens":
			return "178, 80, 188";
		case "transition metals":
			return "61, 104, 19";
		case "post-transition metals":
			return "147, 41, 120";
		case "lanthanoids":
			return config[view_mode].elementRGB.lanthanoids;
		case "actinoids":
			return "0, 128, 128";
		case "unknown":
			return config[view_mode].elementRGB.unknown;
		default:
			return "0, 0, 0";
	}
}

var fetchedData;
var previewCurrentElem;
function generateTable(data = fetchedData) {
    (main.querySelectorAll("section.element")).forEach(function(element) {
        element.remove();
    });
    
    data.elements.forEach(element => {
		const appendedElementContainer = document.createElement("section");
		appendedElementContainer.className = `element element-${element.atomicNumber}`;

		const appendedElementLeftInfo = document.createElement("section");
		appendedElementLeftInfo.className = "left-info";

		const appendedElementNumber = document.createElement("span");
		appendedElementNumber.innerHTML = element.atomicNumber;
		appendedElementNumber.className = `number`;

		const appendedElementSymbol = document.createElement("span");
		appendedElementSymbol.innerHTML = element.symbol;
		appendedElementSymbol.className = `symbol`;
		appendedElementSymbol.style.color = `rgb(${setElementRGB(element.groupBlock)})`;

		const appendedElementName = document.createElement("span");
		appendedElementName.innerHTML = element.name;
		appendedElementName.className = `name`;

		const appendedElementMass = document.createElement("span");
		appendedElementMass.innerHTML = element.atomicMass;
		appendedElementMass.className = `mass`;

		appendedElementLeftInfo.appendChild(appendedElementNumber);
		appendedElementLeftInfo.appendChild(appendedElementSymbol);
		appendedElementLeftInfo.appendChild(appendedElementName);
		appendedElementLeftInfo.appendChild(appendedElementMass);

		const appendedElementRightInfo = document.createElement("div");
		appendedElementRightInfo.className = "right-info";

		element.shells.forEach(shellNumber => {
			const shell = document.createElement("span");
			shell.innerHTML = shellNumber;
			appendedElementRightInfo.appendChild(shell);
		});

		appendedElementContainer.appendChild(appendedElementLeftInfo);
		appendedElementContainer.appendChild(appendedElementRightInfo);

		Object.assign(appendedElementContainer.style, {
			gridRow: element.ypos,
			gridColumn: element.xpos,
			backgroundColor: `rgba(${setElementRGB(element.groupBlock)}, ${config[view_mode].elemBG.alpha})`,
			borderColor: `rgb(${setElementRGB(element.groupBlock)})`
		});

		appendedElementContainer.addEventListener("mouseover", function() {
			appendedElementContainer.style.backgroundColor = "rgba(${config[view_mode].elemBG.hoverBG}, 0.3)";
			document.querySelector(".preview").style.borderBottomColor = `rgba(${setElementRGB(element.groupBlock)}, 0.6)`;
			document.querySelector(".preview .symbol").style.color = `rgb(${setElementRGB(element.groupBlock)})`;
			document.querySelector(".preview .number").innerHTML = element.atomicNumber;
			document.querySelector(".preview .symbol").innerHTML = element.symbol;
			document.querySelector(".preview .name").innerHTML = element.name;
			document.querySelector(".preview .mass").innerHTML = element.atomicMass;
			document.querySelector(".preview .right-info").innerHTML = "";
			previewCurrentElem = element;
			
			element.shells.forEach(shellNumber => {
				const shell = document.createElement("span");
				shell.innerHTML = shellNumber;
				document.querySelector(".preview .right-info").appendChild(shell);
			});
			
			filterLabel.forEach(group => {
				const groupLabelHTML = group.textContent.toLowerCase();
				if (groupLabelHTML === element.groupBlock) {
					group.style.backgroundColor = "rgba(${config[view_mode].elemBG.hoverBG}, 0.3)";
				}
			});
		});

		appendedElementContainer.addEventListener("mouseout", function() {
			appendedElementContainer.style.backgroundColor = `rgba(${setElementRGB(element.groupBlock)}, ${config[view_mode].elemBG.alpha})`;
			filterLabel.forEach(group => {
				const groupLabelHTML = group.textContent.toLowerCase();
				if (groupLabelHTML === element.groupBlock) {
					group.style.backgroundColor = `rgba(${setElementRGB(element.groupBlock)}, ${config[view_mode].elemBG.alpha})`;
				}
			});
		});

		appendedElementContainer.addEventListener("click", function() {
			modal.classList.add("visible-model");
			main.classList.add("blur-main");
			
			document.documentElement.classList.add("modal-hide-overflow");
			
			document.querySelector(".modal").style.color = `rgb(${setElementRGB(element.groupBlock)})`;
			document.querySelector(".modal .notation .number").innerHTML = element.atomicNumber;
			document.querySelector(".modal .notation .symbol").innerHTML = element.symbol;
			document.querySelector(".modal .notation .mass").innerHTML = element.atomicMass;
			
			var test = element.groupBlock;
			if (test == "unknown") {
				document.querySelector(".modal .group").innerHTML = test;
			} else if (test == "noble gases") {
				document.querySelector(".modal .group").innerHTML = test.slice(0, -2);
			} else {
				document.querySelector(".modal .group").innerHTML = test.slice(0, -1);
			}
			
			var emptyValue = "<i>Unknown</i>";
			document.querySelector(".modal .name").innerHTML = element.name;
			document.querySelector(".modal .summary").innerHTML = element.summary;
			document.querySelector(".modal .more-info .standard-state").innerHTML = element.standardState ? element.standardState : emptyValue;
			document.querySelector(".modal .more-info .bonding-type").innerHTML = element.bondingType ? element.bondingType : emptyValue;
			document.querySelector(".modal .more-info .ion-radius").innerHTML = element.ionRadius ? element.ionRadius : emptyValue;
			document.querySelector(".modal .more-info .atomic-radius").innerHTML = element.atomicRadius ? element.atomicRadius : emptyValue;
			document.querySelector(".modal .more-info .electronic-configuration").innerHTML = element.electronicConfiguration ? element.electronicConfiguration : emptyValue;
			document.querySelector(".modal .more-info .electronegativity").innerHTML = element.electronegativity ? element.electronegativity : emptyValue;
			document.querySelector(".modal .more-info .ionization-energy").innerHTML = element.ionizationEnergy ? element.ionizationEnergy : emptyValue;
			document.querySelector(".modal .more-info .electron-affinity").innerHTML = element.electronAffinity ? element.electronAffinity : emptyValue;
			document.querySelector(".modal .more-info .oxidation-states").innerHTML = element.oxidationStates ? element.oxidationStates : emptyValue;
			document.querySelector(".modal .more-info .density").innerHTML = element.density ? element.density : emptyValue;
			document.querySelector(".modal .more-info .melting-point").innerHTML = element.meltingPoint ? `${element.meltingPoint}&deg;K` : emptyValue;
			document.querySelector(".modal .more-info .boiling-point").innerHTML = element.boilingPoint ? `${element.boilingPoint}&deg;K` : emptyValue;
			document.querySelector(".modal .more-info .year-discovered").innerHTML = element.yearDiscovered ? element.yearDiscovered : emptyValue;
			document.querySelector(".modal .more-info .diatomic").innerHTML = element.diatomic ? element.diatomic : emptyValue;
			document.querySelector(".modal .more-info .neutron-num").innerHTML = element.neutronNumber ? element.neutronNumber : emptyValue;
			document.querySelector(".modal .more-info .shells").innerHTML = "";
			
			matm = new Atom({
				containerId: ".electron-container",
				numElectrons: arrSum(element.shells),
				nucleusColor: `rgba(${config[view_mode].atomElem.nucleusColor}, 0)`,
				nucleusRadius: 1,
				electronRadius: config[view_mode].atomElem.electronRadius,
				electronColor: `rgb(${setElementRGB(element.groupBlock)})`,
				orbitalSpacing: config[view_mode].atomElem.orbitalSpacing,
				orbitalWidth: config[view_mode].atomElem.orbitalWidth,
				orbitalColor: config[view_mode].atomElem.orbitalColor,
				idNumber: 1,
				animationTime: 0,
				rotateConfig: {
					speed: 25,
					clockwise: true
				},
				orbitalRotationConfig: {
					pattern: {
						alternating: false,
						clockwise: true,
						preset: "uniform",
					}
				},
				symbolOffset: 8, // When modifying nucleus radius this may need adjusting
				drawSymbol: false // Render atomic symbol or not
			});
			
			element.shells.forEach((shell, shellPos) => {
				const shellNum = shellPos + 1 < element.shells.length ? `${shell}, ` : shell;
				const initialText = document.querySelector(".modal .more-info .shells").textContent;
				document.querySelector(".modal .more-info .shells").innerHTML = `${initialText}${shellNum}`;
			});
		});

		elementGroups.forEach((group, key) => {
			const groupLabelElement = filterLabel[key];
			const groupLabelHTML = groupLabelElement.textContent.toLowerCase();
			if (groupLabelHTML === group) {
				Object.assign(groupLabelElement.style, {
					backgroundColor: `rgba(${setElementRGB(groupLabelHTML)}, ${config[view_mode].groupBG.alpha})`,
					borderColor: `rgb(${setElementRGB(groupLabelHTML)})`
				});
			}
			groupLabelElement.addEventListener("mouseover", function() {
				groupLabelElement.style.backgroundColor = `rgba(${config[view_mode].groupBG.hoverBG}, 0.3)`;
				if (element.groupBlock === groupLabelHTML) {
					document.querySelector(`main .element.element-${element.atomicNumber}`).classList.add("sel-elem");
				} else {
					document.querySelector(`main .element.element-${element.atomicNumber}`).classList.add("bg-damp");
					var spLabels = document.querySelectorAll(".sp-label");
					for (var spLabel of spLabels) {
						spLabel.classList.add("bg-damp");
					}
					var gpLabels = document.querySelectorAll(".gp-label");
					for (var gpLabel of gpLabels) {
						gpLabel.classList.add("bg-damp");
					}
				}
			});
			groupLabelElement.addEventListener("mouseout", function() {
				groupLabelElement.style.backgroundColor = `rgba(${setElementRGB(groupLabelHTML)}, ${config[view_mode].groupBG.alpha})`;
				if (element.groupBlock === groupLabelHTML) {
					document.querySelector(`main .element.element-${element.atomicNumber}`).classList.remove("sel-elem");
				} else {
					document.querySelector(`main .element.element-${element.atomicNumber}`).classList.remove("bg-damp");
					var spLabels = document.querySelectorAll(".sp-label");
					for (var spLabel of spLabels) {
						spLabel.classList.remove("bg-damp");
					}
					var gpLabels = document.querySelectorAll(".gp-label");
					for (var gpLabel of gpLabels) {
						gpLabel.classList.remove("bg-damp");
					}
				}
			});
		});

		main.appendChild(appendedElementContainer);
	});
}

// fetch JSON data
fetch("elements_data.json")
	.then((response) => {
		if (response.ok) { 
		return response.json();
		}
		return Promise.reject(response); 
	})
	.then((periodicTableData) => {
	    fetchedData = periodicTableData;
		generateTable(fetchedData);
	})
	.catch((error) => {
		console.error(`Failed to fetch element data: ${error}`);
	});

const modalCloseButton = document.querySelector(".modal .close-button");
modalCloseButton.addEventListener("click", function() {
	modal.classList.remove("visible-model");
	main.classList.remove("blur-main");
	document.documentElement.classList.remove("modal-hide-overflow");
	matm.destroy();
	var bohrContainer = document.querySelectorAll(".bohr-svg-container")[0];
	bohrContainer.parentNode.removeChild(bohrContainer);
});

document.addEventListener("keyup", function(event) {
	if (event.keyCode == 27) {
		modal.classList.remove("visible-model");
		main.classList.remove("blur-main");
		document.documentElement.classList.remove("modal-hide-overflow");
		matm.destroy();
		var bohrContainer = document.querySelectorAll(".bohr-svg-container")[0];
		bohrContainer.parentNode.removeChild(bohrContainer);
	}
});

document.addEventListener("click", function(e) {
	if (e.target.id == "modal-bg") {
		modal.classList.remove("visible-model");
		main.classList.remove("blur-main");
		document.documentElement.classList.remove("modal-hide-overflow");
		matm.destroy();
		var bohrContainer = document.querySelectorAll(".bohr-svg-container")[0];
		bohrContainer.parentNode.removeChild(bohrContainer);
	}
});