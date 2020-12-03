<!DOCTYPE html>
<html class="notranslate" translate="no" lang="en">

<head>
	<meta charset="utf-8" />    
	<meta http-equiv="X-UA-Compatible" content="IE=edge">
	<meta name="google" content="notranslate">
    <meta name="color-scheme" content="dark light">
	<title>Periodic Table | chanrycz.com</title>
	<meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no">
	<link href="modern-reset.css" rel="stylesheet" />
	<link href="style.css?v=<?php echo @filemtime('style.css'); ?>" rel="stylesheet" />
	<link href="https://chanrycz.com/fonts/fonts.css" rel="stylesheet" />
</head>

<body>
    <button class="btn btn-info" id="change-theme"></button>
	<main>
		<section class="filter-container">
			<section class="preview">
				<section class="left-info">
					<span class="number">1</span>
					<span class="symbol" style="color: rgb(225, 40, 10);">H</span>
					<span class="name">Hydrogen</span>
					<span class="mass">1.00794(4)</span>
				</section>
				<section class="right-info">
					<span>1</span>
				</section>
			</section>
			<section>
				<section class="label">Nonmetals</section>
				<section class="label">Noble Gases</section>
				<section class="label">Alkali Metals</section>
				<section class="label">Alkaline Earth Metals</section>
				<section class="label">Metalloids</section>
			</section>
			<section>
				<section class="label">Halogens</section>
				<section class="label">Transition Metals</section>
				<section class="label">Post-Transition Metals</section>
				<section class="label">Lanthanoids</section>
				<section class="label">Actinoids</section>
				<section class="label">Unknown</section>
			</section>
        </section>
        <section class="sp-label lanthanoid-sp" style="grid-area: 6 / 3 / auto / auto;"><p >57 &ndash; 71</p></section>
        <section class="sp-label actinoid-sp" style="grid-area: 7 / 3 / auto / auto;"><p >89 &ndash; 103</p></section>
        
        <section class="gp-label" style="grid-area: 8 / 1 / auto / auto;"><span >1</span></section>
        <section class="gp-label" style="grid-area: 8 / 2 / auto / auto;"><span >2</span></section>
        <section class="gp-label" style="grid-area: 8 / 3 / auto / auto;"><span >3</span></section>
        <section class="gp-label" style="grid-area: 8 / 4 / auto / auto;"><span >4</span></section>
        <section class="gp-label" style="grid-area: 8 / 5 / auto / auto;"><span >5</span></section>
        <section class="gp-label" style="grid-area: 8 / 6 / auto / auto;"><span >6</span></section>
        <section class="gp-label" style="grid-area: 8 / 7 / auto / auto;"><span >7</span></section>
        <section class="gp-label" style="grid-area: 8 / 8 / auto / auto;"><span >8</span></section>
        <section class="gp-label" style="grid-area: 8 / 9 / auto / auto;"><span >9</span></section>
        <section class="gp-label" style="grid-area: 8 / 10 / auto / auto;"><span >10</span></section>
        <section class="gp-label" style="grid-area: 8 / 11 / auto / auto;"><span >11</span></section>
        <section class="gp-label" style="grid-area: 8 / 12 / auto / auto;"><span >12</span></section>
        <section class="gp-label" style="grid-area: 8 / 13 / auto / auto;"><span >13</span></section>
        <section class="gp-label" style="grid-area: 8 / 14 / auto / auto;"><span >14</span></section>
        <section class="gp-label" style="grid-area: 8 / 15 / auto / auto;"><span >15</span></section>
        <section class="gp-label" style="grid-area: 8 / 16 / auto / auto;"><span >16</span></section>
        <section class="gp-label" style="grid-area: 8 / 17 / auto / auto;"><span >17</span></section>
        <section class="gp-label" style="grid-area: 8 / 18 / auto / auto;"><span >18</span></section>
	</main>
	<section class="modal-container" id="modal-bg">
		<section class="modal">
			<header>
				<span class="close-button">&times;</span>
			</header>
			<article>
				<section class="notation">
				    <div class="electron-container"></div>
				    <div class="notation-info">
    					<span class="number"></span>
    					<span class="symbol"></span>
    					<span class="mass"></span>
					</div>
				</section>
				<section class="group"></section>
				<section class="name"></section>
				<p class="summary"></p>
				<section class="more-info">
					<section>
						<section class="title">Standard State:</section>
						<section class="standard-state"></section>
					</section>
					<section>
						<section class="title">Bonding Type:</section>
						<section class="bonding-type"></section>
					</section>
					<section>
						<section class="title">Ion Radius:</section>
						<section class="ion-radius"></section>
					</section>
					<section>
						<section class="title">Atomic Radius:</section>
						<section class="atomic-radius"></section>
					</section>
					<section>
						<section class="title">Electronic Config:</section>
						<section class="electronic-configuration"></section>
					</section>
					<section>
						<section class="title">Electronegativity:</section>
						<section class="electronegativity"></section>
					</section>
					<section>
						<section class="title">Ionization Energy:</section>
						<section class="ionization-energy"></section>
					</section>
					<section>
						<section class="title">Electron Affinity:</section>
						<section class="electron-affinity"></section>
					</section>
					<section>
						<section class="title">Oxidation State:</section>
						<section class="oxidation-states"></section>
					</section>
					<section>
						<section class="title">Density:</section>
						<section class="density"></section>
					</section>
					<section>
						<section class="title">Melting Point:</section>
						<section class="melting-point"></section>
					</section>
					<section>
						<section class="title">Boiling Point:</section>
						<section class="boiling-point"></section>
					</section>
					<section>
						<section class="title">Shells:</section>
						<section class="shells"></section>
					</section>
					<section>
						<section class="title">Year Discovered:</section>
						<section class="year-discovered"></section>
					</section>
					<section>
						<section class="title">Diatomic:</section>
						<section class="diatomic"></section>
					</section>
					<section>
					    <section class="title">Neutron Number:</section>
					    <section class="neutron-num"></section>
					</section>
				</section>
			</article>
		</section>
	</section>
    <script type="text/javascript" src="atom.min.js?v=<?php echo @filemtime('atom.min.js'); ?>"></script>
    <script type="text/javascript" src="script.js?v=<?php echo @filemtime('script.js'); ?>"></script>
	<script>
        document.getElementById("change-theme").addEventListener("click", function () {
            changeTheme();
        });
    </script>
</body>

</html>