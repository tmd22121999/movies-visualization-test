// https://observablehq.com/@lingo/labeled-select-box-library@46
function _1(md){return(
md`# Labeled select-box (library)`
)}

function _2(md){return(
md`
**exports** \`labeledSelect\`
`
)}

function _options(){return(
['Warm','Cool','Accent','Category10','Paired','Viridis', 'YlGnBu', 'Inferno','Magma','Plasma','CubehelixDefault','Dark2','Rainbow','Set1','Set2'].sort()
)}

function _opt(labeledSelect,options){return(
labeledSelect('Test: ', options)
)}

function _labeledSelect(html,mapToOptions){return(
function labeledSelect(label, options, initial) {  
  if (!labeledSelect.lastID) {
    labeledSelect.lastID = 0;
  }
  let id = "labeled-select${labeledSelect.lastID++}";
  const dom      = html`<label for="${id}">${label}</label><select id="${id}">${mapToOptions(options)}</select>`;
  const select = dom.querySelector('select');
  
  select.addEventListener('input',(e) => {
    dom.value = select.value;
  });
  
  select.value = dom.value = initial || options[0];
  return dom;
}
)}

function _mapToOptions(){return(
function mapToOptions(arr) {
  return arr.map(x => {
    let attr = '';
    if (typeof(x) === 'object' && x.value) {
      attr=`value="${x.value}"`;
    }
    return `<option ${attr}>${x}</option>`;
  });
}
)}

export default function define(runtime, observer) {
  const main = runtime.module();
  main.variable(observer()).define(["md"], _1);
  main.variable(observer()).define(["md"], _2);
  main.variable(observer("options")).define("options", _options);
  main.variable(observer("viewof opt")).define("viewof opt", ["labeledSelect","options"], _opt);
  main.variable(observer("opt")).define("opt", ["Generators", "viewof opt"], (G, _) => G.input(_));
  main.variable(observer("labeledSelect")).define("labeledSelect", ["html","mapToOptions"], _labeledSelect);
  main.variable(observer("mapToOptions")).define("mapToOptions", _mapToOptions);
  return main;
}
