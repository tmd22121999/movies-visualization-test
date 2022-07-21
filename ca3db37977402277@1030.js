// https://observablehq.com/@785bf84e5040ad23/movies-visualization@1030
import define1 from "./26670360aa6f343b@202.js";
import define2 from "./a2166040e5fb39a6@229.js";
import define3 from "./d4fdf4c69ec38ba0@483.js";
import define4 from "./ba71f1bcb80e011e@346.js";
import define5 from "./b39dd4730c6d0fe2@46.js";

function _1(md){return(
md`# Movies visualization`
)}

function _data(FileAttachment){return(
FileAttachment("Hydra-Movie-Scrape.csv").csv({typed: true})
)}

function _5(printTable,data){return(
printTable(data.slice(0, 20))
)}

function _7(vl,data){return(
vl.markBar()
  .data(data)
  .encode(
    vl.x().count('Title'), //count how many movies release in that year
    vl.y().fieldN('Year')
  )
  .render()
)}

function _8(vl,data)
{
  const line = vl.markLine().data(data).encode(
    vl.x().fieldQ('Year'),
    vl.y().count('Title')
  );

  const point = vl.markCircle().data(data).encode(
    vl.x().fieldQ('Year'),
    vl.y().count('Title'),
    vl.tooltip(['Year']).count('Title')
  );
  
  return vl.layer(line, point).render();
}


function _9(vl,data){return(
vl.markArea()
  .data(data)
  .encode(
    vl.y().count('Title'), //Rating of movies
    vl.x().fieldN('Rating')
  )
  .render()
)}

function _10(vl,data){return(
vl.markCircle()
  .data(data)
  .encode(
    vl.y().fieldQ('Rating').bin({maxbins: 20}),
    vl.x().fieldQ('Title').bin({maxbins: 20}),
    vl.size().count()
  )
  .render()
)}

function _11(vl,data){return(
vl.markBar()
  .data(data)
  .encode(
    vl.x().average('Rating'), //Average of Rating movies
    vl.y().fieldN('Year') // trương dữ liệu định danh
  )
  .render()
)}

function _12(vl,data){return(
vl.markBar()
  .data(data)
  .encode(
    vl.x().average('Runtime'), //Average of movies runtime
    vl.y().fieldN('Year') // trương dữ liệu định danh
  )
  .render()
)}

function _col(data){return(
data.columns.slice()
)}

function _runtime(Inputs,d3,data){return(
Inputs.range(d3.extent(data, d => d.Runtime), {step: 1, label: "thời lượng (phút)"})
)}

function _17(Inputs,data,runtime,col){return(
Inputs.table(data.filter(d => d.Runtime < runtime * 1.001 && runtime * 0.999 < d.Runtime), {sort: "time", col})
)}

function _ratings(d3,data){return(
d3.group(data, d => d.Rating)
)}

function _topRating(Inputs,data,col){return(
Inputs.table(data.filter(d => d.Rating >= 8.5), {sort: "Rating", col})
)}

function _20(vl,data){return(
vl.markCircle()
  .data(data)
  .encode(
    vl.x().fieldQ('Runtime'), //runtime and rating //quantitative scheme : "lightmulti"
    vl.y().fieldQ('Rating'), //quantitative range:['lightblue','red'],type:'linear'
    vl.tooltip(['Runtime', 'Rating']),
    vl.color().fieldQ("Rating").scale({ scheme : "blueorange" })
  )
  .render()
)}

function _21(vl,data){return(
vl.markBar()
  .data(data)
  .encode(
    vl.x().fieldQ('Rating').bin({maxbins: 20}),
    vl.y().count()
  )
  .render()
)}

function _23(md){return(
md`thể loại nào có nhiều phim :`
)}

function _27(md){return(
md`số lượng phim mỗi thể loại qua từng năm`
)}

function _rangeslider2(rangeSlider,moviesJoinedProcessed){return(
rangeSlider(moviesJoinedProcessed, d => new Date(d.startYear))
)}

function _range2(debounce,rangeslider2){return(
debounce.wait(() => rangeslider2.range.map(d => d.getFullYear()))
)}

function _genres(data,range2){return(
data.filter(x=>x['Year']>=range2[0]&& x['Year']<=range2[1]).flatMap(value => value['Genres'].split("|"))
)}

function _31(WordCloud,genres,width,invalidation){return(
WordCloud(genres, {
  width,
  height: 600,
  fontScale:3,
  marginTop:50,
  title:"Biển diễn số lượng phim mỗi thể loại bằng word cloud",
  invalidation// a promise to stop the simulation when the cell is re-run
})
)}

function _32(countofgenres,moviesJoinedProcessed){return(
countofgenres(moviesJoinedProcessed)
)}

function _33(md){return(
md`điểm rating theo từng năm của từng thể loại`
)}

function _Genre(Inputs,listGenres,data){return(
Inputs.select(listGenres(data), {label: "Chọn thể loại"})
)}

function _dataProcessed(dataprocess,data,Genre){return(
dataprocess(data).filter(x=>x.Genres==Genre)
)}

function _36(Plot,dataProcessed){return(
Plot.plot({
  marginRight: 40,
  y: {
    grid: true,
    label:'Điểm trung bình'
  },x: {
    label:'Năm'
  },
  marks: [
    Plot.ruleY([0,10]),
    Plot.line(dataProcessed, {
      x: "Year", 
      y: "avg",
      stroke: "blue"
    }),
     Plot.text(dataProcessed, Plot.selectLast(
       {x: "Year", 
        y: "avg",  
        text: "Genres", 
        textAnchor: "start",}
     )),
    Plot.line(dataProcessed, {x: "Year", y: "Avgyear",stroke: "red"}),
     Plot.text(dataProcessed, Plot.selectLast(
       {x: "Year", y: "Avgyear",
        text: ["Tất cả"], 
        textAnchor: "start",}
     )),
  ]
})
)}

function _37(md){return(
md`đạo diễn`
)}

function _directData(group,data){return(
group(data)
  .by(d=>d.Director)
  .orderBy(d=>d.key)
  .run() // This returns array
  .map(grouped=>{
     const horses = grouped.values.map(d=>parseFloat(d.Rating));
     const sum = Math.round(horses.reduce((a, b) => a + b, 0)* 100) / 100;
     const avg = Math.round(sum/grouped.values.length* 100) / 100;
     const max = Math.max(...horses);
     const min = Math.min(...horses);
     return Object.assign(
       {min,max,sum,avg},
       grouped,
     )
  }).sort(function(a, b){return -a.avg + b.avg})
)}

function _40(vl,directData){return(
vl.markBar()
  .data(directData)
  .encode(
    vl.x().fieldQ('avg').bin({maxbins: 20}),
    vl.y().count()
  )
  .render()
)}

function _41(Plot,directData){return(
Plot.plot({
  marginLeft:200,
  x:{
    label: "Rating",
  },
  y:{
    label: "Director name",
  },
  marks: [
    Plot.barX(directData.slice(0,10), {
      y: "key", 
      x: "avg", 
      fill:"lightBlue",
      title: (d) => `${d.key} \n Điểm trung bình: ${d.avg} `, 
      sort: {y: "x", reverse: true}}),
    Plot.ruleY([0])
  ]
})
)}

function _Genreslist(listGenres,data){return(
listGenres(data)
)}

function _selectGenre(labeledSelect,Genreslist){return(
labeledSelect('Selected genre: ', ['all',...Genreslist], 'Comedy')
)}

function _45(ratingdripoff,moviesJoinedProcessed,selectGenre){return(
ratingdripoff(moviesJoinedProcessed,selectGenre)
)}

function _debounce(){return(
function () {
  let timerId;
  return {
    wait: (cb, ms = 100) => new Promise(res => { 
      clearTimeout(timerId)
      timerId = setTimeout(() => res(cb()), ms)
    })
  }
}()
)}

function _topGenres(){return(
['Comedy', 'Action', 'Drama', 'Crime', 'Documentary', 'Adventure']
)}

function _selectGenre2(labeledSelect,Genreslist){return(
labeledSelect('Selected genre: ', ['top',...Genreslist])
)}

function _rangeslider(rangeSlider,moviesJoinedProcessed){return(
rangeSlider(moviesJoinedProcessed, d => new Date(d.startYear))
)}

function _51(ratingcountchart,moviesJoinedProcessed,selectGenre2,topGenres,range){return(
ratingcountchart(moviesJoinedProcessed, selectGenre2, topGenres, range)
)}

function _range(debounce,rangeslider){return(
debounce.wait(() => rangeslider.range.map(d => d.getFullYear()))
)}

function _dataprs2(dataprocess2,data){return(
dataprocess2(data)
)}

function _moviesJoinedProcessed(dataprs2){return(
dataprs2.map(d=> {return{tconst:'aa',averageRating:d.Rating,startYear:`${d.Year}`,genres:d.Genres,mainGenre:d.Genres.split("|")[0],primaryTitle:d.Title,revenue:"0",budget:"0"}})
)}

function _55(md){return(
md`Diễn viên`
)}

function _castFlatMapData(castFlatMap,data){return(
castFlatMap(data)
)}

function _castGroupData(group,castFlatMapData){return(
group(castFlatMapData)
  .by(d=>d.Cast)
  .orderBy(d=>d.key)
  .run() // This returns array
  .map(grouped=>{
     const Ratingg = grouped.values.map(d=>parseFloat(d.Rating));
     const sum = Math.round(Ratingg.reduce((a, b) => a + b, 0)* 100) / 100;
     const avg = Math.round(sum/grouped.values.length* 100) / 100;
     const max = Math.max(...Ratingg);
     const min = Math.min(...Ratingg);
     return Object.assign(
       {min,max,sum,avg},
       grouped,
     )
  }).sort(function(a, b){return -a.avg + b.avg})
)}

function _58(Plot,castGroupData){return(
Plot.plot({
  marginLeft:200,
  x:{
    label: "Rating",
  },
  y:{
    label: "Actor name",
  },
  marks: [
    Plot.barX(castGroupData.slice(0,10), {
      y: "key", 
      x: "avg", 
      fill:"lightBlue",
      title: (d) => `${d.key} \n Điểm trung bình: ${d.avg} `, 
      sort: {y: "x", reverse: true}
    }),
    Plot.ruleY([0])
  ]
})
)}

export default function define(runtime, observer) {
  const main = runtime.module();
  function toString() { return this.url; }
  const fileAttachments = new Map([
    ["Hydra-Movie-Scrape.csv", {url: new URL("./files/20baa06a92464b17d51fddea7a19b20bd8126385a67b637a4b5a51144854c4bcc2a801348acb988b68f4cef45df0ddeaba2cfe999fc495b38c6f9f5450e56958.csv", import.meta.url), mimeType: "text/csv", toString}]
  ]);
  main.builtin("FileAttachment", runtime.fileAttachments(name => fileAttachments.get(name)));
  main.variable(observer()).define(["md"], _1);
  const child1 = runtime.module(define1);
  main.import("vl", child1);
  const child2 = runtime.module(define2);
  main.import("printTable", child2);
  main.variable(observer("data")).define("data", ["FileAttachment"], _data);
  main.variable(observer()).define(["printTable","data"], _5);
  main.variable(observer()).define(["vl","data"], _7);
  main.variable(observer()).define(["vl","data"], _8);
  main.variable(observer()).define(["vl","data"], _9);
  main.variable(observer()).define(["vl","data"], _10);
  main.variable(observer()).define(["vl","data"], _11);
  main.variable(observer()).define(["vl","data"], _12);
  main.variable(observer("col")).define("col", ["data"], _col);
  main.variable(observer("viewof runtime")).define("viewof runtime", ["Inputs","d3","data"], _runtime);
  main.variable(observer("runtime")).define("runtime", ["Generators", "viewof runtime"], (G, _) => G.input(_));
  main.variable(observer()).define(["Inputs","data","runtime","col"], _17);
  main.variable(observer("ratings")).define("ratings", ["d3","data"], _ratings);
  main.variable(observer("topRating")).define("topRating", ["Inputs","data","col"], _topRating);
  main.variable(observer()).define(["vl","data"], _20);
  main.variable(observer()).define(["vl","data"], _21);
  main.variable(observer()).define(["md"], _23);
  const child3 = runtime.module(define3);
  main.import("WordCloud", child3);
  main.import("dataprocess", child3);
  main.import("listGenres", child3);
  main.import("ratingdripoff", child3);
  main.import("ratingcountchart", child3);
  main.import("countofgenres", child3);
  main.import("dataprocess2", child3);
  main.import("randcolorgenre", child3);
  main.import("castFlatMap", child3);
  main.variable(observer()).define(["md"], _27);
  main.variable(observer("viewof rangeslider2")).define("viewof rangeslider2", ["rangeSlider","moviesJoinedProcessed"], _rangeslider2);
  main.variable(observer("rangeslider2")).define("rangeslider2", ["Generators", "viewof rangeslider2"], (G, _) => G.input(_));
  main.variable(observer("range2")).define("range2", ["debounce","rangeslider2"], _range2);
  main.variable(observer("genres")).define("genres", ["data","range2"], _genres);
  main.variable(observer()).define(["WordCloud","genres","width","invalidation"], _31);
  main.variable(observer()).define(["countofgenres","moviesJoinedProcessed"], _32);
  main.variable(observer()).define(["md"], _33);
  main.variable(observer("viewof Genre")).define("viewof Genre", ["Inputs","listGenres","data"], _Genre);
  main.variable(observer("Genre")).define("Genre", ["Generators", "viewof Genre"], (G, _) => G.input(_));
  main.variable(observer("dataProcessed")).define("dataProcessed", ["dataprocess","data","Genre"], _dataProcessed);
  main.variable(observer()).define(["Plot","dataProcessed"], _36);
  main.variable(observer()).define(["md"], _37);
  const child4 = runtime.module(define4);
  main.import("group", child4);
  main.variable(observer("directData")).define("directData", ["group","data"], _directData);
  main.variable(observer()).define(["vl","directData"], _40);
  main.variable(observer()).define(["Plot","directData"], _41);
  main.variable(observer("Genreslist")).define("Genreslist", ["listGenres","data"], _Genreslist);
  const child5 = runtime.module(define5);
  main.import("labeledSelect", child5);
  main.variable(observer("viewof selectGenre")).define("viewof selectGenre", ["labeledSelect","Genreslist"], _selectGenre);
  main.variable(observer("selectGenre")).define("selectGenre", ["Generators", "viewof selectGenre"], (G, _) => G.input(_));
  main.variable(observer()).define(["ratingdripoff","moviesJoinedProcessed","selectGenre"], _45);
  const child6 = runtime.module(define4);
  main.import("rangeSlider", child6);
  main.variable(observer("debounce")).define("debounce", _debounce);
  main.variable(observer("topGenres")).define("topGenres", _topGenres);
  main.variable(observer("viewof selectGenre2")).define("viewof selectGenre2", ["labeledSelect","Genreslist"], _selectGenre2);
  main.variable(observer("selectGenre2")).define("selectGenre2", ["Generators", "viewof selectGenre2"], (G, _) => G.input(_));
  main.variable(observer("viewof rangeslider")).define("viewof rangeslider", ["rangeSlider","moviesJoinedProcessed"], _rangeslider);
  main.variable(observer("rangeslider")).define("rangeslider", ["Generators", "viewof rangeslider"], (G, _) => G.input(_));
  main.variable(observer()).define(["ratingcountchart","moviesJoinedProcessed","selectGenre2","topGenres","range"], _51);
  main.variable(observer("range")).define("range", ["debounce","rangeslider"], _range);
  main.variable(observer("dataprs2")).define("dataprs2", ["dataprocess2","data"], _dataprs2);
  main.variable(observer("moviesJoinedProcessed")).define("moviesJoinedProcessed", ["dataprs2"], _moviesJoinedProcessed);
  main.variable(observer()).define(["md"], _55);
  main.variable(observer("castFlatMapData")).define("castFlatMapData", ["castFlatMap","data"], _castFlatMapData);
  main.variable(observer("castGroupData")).define("castGroupData", ["group","castFlatMapData"], _castGroupData);
  main.variable(observer()).define(["Plot","castGroupData"], _58);
  return main;
}
