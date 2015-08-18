# Styleguide options

### Head

    <meta name='viewport' content='width=device-width, initial-scale=1' />
	<script src='https://cdn.rawgit.com/styledown/styledown/v1.0.2/data/styledown.js'></script>
    <link rel='stylesheet' href='https://cdn.rawgit.com/styledown/styledown/v1.0.2/data/styledown.css' />
	<style>
	body {margin: 0; font-family: Arial, sans-serif; color: #444;}
	.doca {text-align: right; margin: 0; padding: 1em; background: #9EBD54;}
	.sg-container {max-width: 980px; padding: 0 10px; margin: auto;}
	</style>

### Body
	
	h1.doca doca
	<div class='sg-container' sg-content></div>


<!--$ styledown dev/sass/*.scss doca/doc.md doca/config.md > doca/styleguides.html-->