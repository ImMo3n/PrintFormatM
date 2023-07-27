<h1>Print Format(M)</h1>
<p>This app/tool was created as a way to display data in printable A4 landscape format using the browser.</p>
<p>The idea is you put the items you would want to be printed out inside the PageFormat and it would measure out the elements passed into it and put it inside one "page" and if the page doesn't have space for the next item it will create another "page" until there is no item left.</p>
<p>The page format would have header, footer, aside and a main empty content so that it would be populated with content.</p>
<p>It would accept excel (in a specific format) and turn it into a table using the <a href="https://cdn.sheetjs.com/xlsx-0.20.0/package/dist/xlsx.full.min.js">xlsx</a> plugin.</p>
<p>It would also accept images, if the natural size of the image was too large it would force-fit into a single page and move onto the next page.</p>
<p>When page loads (detected by "load" event listener) it creates the pages for being printed. But in reality it required more time so we added a delay as well.</p>
<p>When pages are split, page numbers are applied to the bottom of the page based on sample name.</p>
<p>This was for a niche requirement of a project and cannot run on it's own since it would require data from local storage (I know, weird). Therefore it is not recommended to clone this repository as it will throw many errors.</p>
