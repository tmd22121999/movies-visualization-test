// https://observablehq.com/@tmd22121999/word-cloud@483
import define1 from "./7a9e12f9fb3d8e06@459.js";
import define2 from "./ba71f1bcb80e011e@346.js";

function _1(md){return(
md`# Word Cloud

A demonstration of [d3-cloud](https://github.com/jasondavies/d3-cloud/). Paste into or edit the text below to update the chart. Note: word clouds [may be harmful](https://www.niemanlab.org/2011/10/word-clouds-considered-harmful/).`
)}

function _data(FileAttachment){return(
FileAttachment("Hydra-Movie-Scrape.csv").csv()
)}

function _4(howto){return(
howto("WordCloud")
)}

async function _source(Inputs,FileAttachment,width){return(
Inputs.textarea({
  value: (await FileAttachment("dream.txt").text()).trim(),
  rows: 20,
  width
})
)}

function _6(md){return(
md`*(Martin Luther King, Jr.: “I Have a Dream”, 1963)*`
)}

function _randomColor(){return(
["#84a2c3", "#f8a95d", "#ec8988", "#a2cfcc", "#8cc086", "#f3da77", "#c9a1be", "#ffbac1", "#bca191", "#d0c9c6", "#84a2c3", "#f8a95d", "#ec8988", "#a2cfcc", "#8cc086", "#f3da77", "#c9a1be", "#ffbac1", "#bca191", "#d0c9c6", "#84a2c3", "#f8a95d", "#ec8988", "#a2cfcc", "#8cc086", "#f3da77", "#c9a1be", "#ffbac1", "#bca191", "#d0c9c6"]
)}

function _randomColo2r333(){return(
["#D84B20","#E4A010","#7E7B52","#474B4E","#EF8AA7","#A12312","#781F19","#252850","#BDECB6","#C35831","#308446","#A65E2E","#E5BE01","#8F8B66","#826C34","#4C2F27","#4E5452","#8E402A","#686C5E","#A141B4","#E55137","#84C3BE","#641C34","#06F516"]
)}

function _randomColo2r(){return(
['aqua', 'black', 'blue', 'fuchsia', 'gray', 'green', 
'lime', 'maroon', 'navy', 'olive', 'orange', 'purple', 'red', 
'silver', 'teal', 'white', 'yellow','#4D80CC', '#9900B3', 
		  '#E64D66', '#4DB380', '#FF4D4D', '#99E6E6', '#6666FF']
)}

function _listGenre(){return(
["Uncategorized","Documentary","Music", "Adventure", "Animation","Comedy", "Family","Fantasy", "Horror", "Drama", "Sport", "Romance", "Action", "Sci-Fi", "News", "History","Thriller", "Western", "Crime","Mystery","Biography", "Musical", "War", "Reality-TV"
]
)}

function _listGenre2(){return(
["Action","Adventure", "Animation", "Biography", "Comedy", "Crime", "Documentary", "Drama", "Family", "Fantasy", "History", "Horror", "Music", "Musical", "Mystery", "News", "Reality-TV", "Romance",  "Sci-Fi", "Sport", "Thriller","Uncategorized", "War", "Western"]
)}

function _randcolorgenre(randomColo2r,listGenre2){return(
randomColo2r .reduce(function(result, field, index) {
  result[listGenre2[index]] = field;
  return result;
}, {})
)}

function _WordCloud2(d3,d3Cloud){return(
function WordCloud2(text, {
  size = group => group.length, // Given a grouping of words, returns the size factor for that word
  word = d => d, // Given an item of the data array, returns the word
  marginTop = 0, // top margin, in pixels
  marginRight = 0, // right margin, in pixels
  marginBottom = 0, // bottom margin, in pixels
  marginLeft = 0, // left margin, in pixels
  width = 640, // outer width, in pixels
  height = 400, // outer height, in pixels
  maxWords = 20, // maximum number of words to extract from the text
  fontFamily = "sans-serif", // font family
  fontScale = 5, // base font size
  padding = 11, // amount of padding between the words (in pixels)
  rotate = 0, // a constant or function to rotate the words
  invalidation, // when this promise resolves, stop the simulation
  color="#000000"
} = {}) {
  const words = text;
  
  const data = d3.rollups(words, size, w => w)
    .sort(([, a], [, b]) => d3.descending(a, b))
    .slice(0, maxWords)
    .map(([key, size]) => ({text: word(key), size}));
  
  var countdata = words.map(value => value['count']);
  var ratio = Math.max(...countdata) / 100;
  
  const svg = d3.create("svg")
      .attr("viewBox", [0, 0, width, height])
      .attr("width", width)
      .attr("font-family", fontFamily)
      .attr("text-anchor", "middle")
      .attr("style", "max-width: 100%; height: auto; height: intrinsic;")
      
  const g = svg.append("g").attr("transform", `translate(${marginLeft},${marginTop})`);

  const cloud = d3Cloud()
      .size([width - marginLeft - marginRight, height - marginTop - marginBottom])
      .words(words)
      .padding(padding)
      .rotate(rotate)
      .font(fontFamily)
      .fontSize(d => Math.sqrt(d.size) * fontScale)
      .on("word", ({size, x, y, rotate, text}) => {
        g.append("text")
            .attr("font-size", Math.round(text['count']/ratio))
            .attr("transform", `translate(${x},${y}) rotate(${rotate})`)
            .attr("fill","#"+Math.floor(Math.random()*16777215).toString(16))
            .text(text['value']);
      });

  cloud.start();
  invalidation && invalidation.then(() => cloud.stop());
  return svg.node();
}
)}

function _WordCloud(d3,d3Cloud,randcolorgenre){return(
function WordCloud(text, {
  size = group => group.length, // Given a grouping of words, returns the size factor for that word
  word = d => d, // Given an item of the data array, returns the word
  marginTop = 0, // top margin, in pixels
  marginRight = 0, // right margin, in pixels
  marginBottom = 0, // bottom margin, in pixels
  marginLeft = 50, // left margin, in pixels
  width = 640, // outer width, in pixels
  height = 400, // outer height, in pixels
  maxWords = 250, // maximum number of words to extract from the text
  fontFamily = "sans-serif", // font family
  fontScale = 1, // base font size
  padding = 0, // amount of padding between the words (in pixels)
  rotate = 0, // a constant or function to rotate the words
  title="",
  invalidation // when this promise resolves, stop the simulation
} = {}) {
  const words = typeof text === "string" ? text.split(/\W+/g) : Array.from(text);
  
  const data = d3.rollups(words, size, w => w)
    .sort(([, a], [, b]) => d3.descending(a, b))
    .slice(0, maxWords)
    .map(([key, size]) => ({text: word(key), size}));
  
  const svg = d3.create("svg")
      .attr("viewBox", [0, 0, width, height])
      .attr("width", width)
      .attr("font-family", fontFamily)
      .attr("text-anchor", "middle")
      .attr("style", "max-width: 100%; height: auto; height: intrinsic;");
svg.append("text")
        .attr("x", (width / 2))             
        .attr("y", 0 + (marginTop / 2))
        .attr("text-anchor", "middle")  
        .style("font-size", "24px") 
        .style("text-decoration", "underline")  
        .text(title);
  const g = svg.append("g").attr("transform", `translate(${marginLeft},${marginTop})`);

  const cloud = d3Cloud()
      .size([width - marginLeft - marginRight, height - marginTop - marginBottom])
      .words(data)
      .padding(padding)
      .rotate(rotate)
      .font(fontFamily)
      .fontSize(d => Math.sqrt(d.size) * fontScale)
      .on("word", ({size, x, y, rotate, text}) => {
        g.append("text")
            .attr("font-size", size)
            .attr("transform", `translate(${x},${y}) rotate(${rotate})`)
            .attr("fill",randcolorgenre[text])
            .text(text);
      });

  cloud.start();
  invalidation && invalidation.then(() => cloud.stop());
  return svg.node();
}
)}

function _15(md){return(
md`"#"+Math.floor(Math.random()*16777215).toString(16)`
)}

function _16(md){return(
md`---

## Data preparation

The WordCloud function does not prepare the contents. Pass it a text that will be split against all spaces and punctuation marks, an array of words that will be grouped and counted, or an array of objects with a key and a value.`
)}

function _words(source,stopwords){return(
source.split(/[\s.]+/g)
  .map(w => w.replace(/^[“‘"\-—()\[\]{}]+/g, ""))
  .map(w => w.replace(/[;:.!?()\[\]{},"'’”\-—]+$/g, ""))
  .map(w => w.replace(/['’]s$/g, ""))
  .map(w => w.substring(0, 30))
  .map(w => w.toLowerCase())
  .filter(w => w && !stopwords.has(w))
)}

function _18(words){return(
words.filter(w => /\W/.test(w))
)}

function _stopwords(){return(
new Set("i,me,my,myself,we,us,our,ours,ourselves,you,your,yours,yourself,yourselves,he,him,his,himself,she,her,hers,herself,it,its,itself,they,them,their,theirs,themselves,what,which,who,whom,whose,this,that,these,those,am,is,are,was,were,be,been,being,have,has,had,having,do,does,did,doing,will,would,should,can,could,ought,i'm,you're,he's,she's,it's,we're,they're,i've,you've,we've,they've,i'd,you'd,he'd,she'd,we'd,they'd,i'll,you'll,he'll,she'll,we'll,they'll,isn't,aren't,wasn't,weren't,hasn't,haven't,hadn't,doesn't,don't,didn't,won't,wouldn't,shan't,shouldn't,can't,cannot,couldn't,mustn't,let's,that's,who's,what's,here's,there's,when's,where's,why's,how's,a,an,the,and,but,if,or,because,as,until,while,of,at,by,for,with,about,against,between,into,through,during,before,after,above,below,to,from,up,upon,down,in,out,on,off,over,under,again,further,then,once,here,there,when,where,why,how,all,any,both,each,few,more,most,other,some,such,no,nor,not,only,own,same,so,than,too,very,say,says,said,shall".split(","))
)}

function _20(WordCloud){return(
WordCloud("Hello, World! This is a small cloud for your enjoyment", {
  width: 250,
  height: 100,
  size: () => .3 + Math.random(),
  rotate: () => (~~(Math.random() * 6) - 3) * 30
})
)}

function _d3Cloud(require){return(
require("d3-cloud@1")
)}

function _23(md){return(
md`nomal data:`
)}

function _col33(){return(
function col33(data) {
  return data.flatMap(({Genres,...rest} )=> {let gr = Genres.split("|") ;return {Genres:gr,...rest}});
}
)}

function _col3(){return(
function col3(col33){
  return col33.flatMap(({Genres,...rest} )=> { return Genres.map(Genres=>({Genres,...rest}))});
}
)}

function _col4(group){return(
function col4(col3){return group(col3)
  .by(d=>d.Year)
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
  })}
)}

function _data4(group){return(
function data4(col4){
  return col4.flatMap(item =>{
  let temp=group(item.values)
  .by(d=>d.Genres)
  .orderBy(d=>d.key)
  .run() // This returns array
  .map(grouped=>{
     const horses = grouped.values.map(d=>parseFloat(d.Rating));
     const sum = Math.round(horses.reduce((a, b) => a + b, 0)* 100) / 100;
     const avg = Math.round(sum/grouped.values.length* 100) / 100;
     const max = Math.max(...horses);
     const min = Math.min(...horses);
     return {avg,Genres:grouped.key}
  })
  return {Avgyear:item.avg,Year:item.key,temp};
})
}
)}

function _dataend(){return(
function dataend(data4){
  return data4.flatMap(({temp,...rest} )=> { return temp.map(Genres=>({avg:Genres.avg,Genres:Genres.Genres,...rest}))});
}
)}

function _dataprocess(dataend,data4,col4,col3,col33){return(
function dataprocess(data){
  return dataend(data4(col4(col3(col33(data)))))
}
)}

function _listGenres(d3,col33){return(
function listGenres(data){
  return Array.from(d3.group(col33(data).flatMap(item=>item.Genres), d => d).keys())
}
)}

function _embed(require){return(
require("vega-embed@6")
)}

function _ratingdripoff(embed){return(
function ratingdripoff(moviesJoinedProcessed,selectGenre){
return  (selectGenre==='all')?
embed({
  $schema: "https://vega.github.io/schema/vega-lite/v4.json",
  data: { values: moviesJoinedProcessed },
  width: 800,
  height: 600,
  transform: [
    {
      filter: { field: "startYear", timeUnit: "year", range: ["2000", "2018"] }
    },
    {
      joinaggregate: [
        {
          op: "mean", // q3
          field: "averageRating",
          as: "avgGenreRating"
        }
      ],
      groupby: [ "startYear"]
    },
    {
      aggregate: [
        {
          op: "count",
          field: "startYear",
          as: "countTitles"
        }
      ],
      groupby: ["startYear", "avgGenreRating"]
    },
    {
      window: [
        {
          op: "lag",
          field: "avgGenreRating",
          as: "prevAvgGenreRating",
        },
         {
          op: "lead",
          field: "countTitles",
          as: "nextCountTitles",
        },
        {
          op: "lag",
          field: "startYear",
          as: "prevStartYear",
        }
      ],
    },
     {
      filter: " (datum.startYear - datum.prevStartYear) / 10e9 > 0"
    },
    {
      calculate:
        "datum.prevAvgGenreRating === null ? datum.avgGenreRating : datum.prevAvgGenreRating",
      as: "prevAvgGenreRating"
    },
    {
      calculate:
        "datum.nextCountTitles === null ? datum.countTitles : datum.nextCountTitles",
      as: "nextCountTitles"
    },
    {
      calculate: "(datum.avgGenreRating - datum.prevAvgGenreRating) /  datum.prevAvgGenreRating",
      as: "avgGenreRatingDiff"
    },
     {
      calculate: "(datum.nextCountTitles - datum.countTitles) /  datum.countTitles",
      as: "countTitlesDiff"
    },
    { calculate: "0", as: "baseline" },
     { calculate: "'ratingGrowth'", as: "ratingGrowth" },
     { calculate: "'titlesGrowth'", as: "titlesGrowth" },
    { calculate: "datum.startYear - datum.prevStartYear", as: "yearDiff" }
  ],
  layer: [
    {
      mark: { type: "bar", opacity: 0.5},
        encoding: {
        x: {
          field: "startYear",
          title: "Year",
          type: "ordinal",
          timeUnit: "year"
        },
        y: { field: "baseline", type: "quantitative", title: "countTitlesDiff, avgGenreRatingDiff" },
        y2: { field: "countTitlesDiff", type: "quantitative" },
           tooltip: [
          { field: "countTitlesDiff", format: ".2f" },
          { field: "countTitles"},
          { field: "nextCountTitles"},
             { field: "startYear", "type": "temporal", title: "year", timeUnit: "year"},
        ],
          color: {field: "titlesGrowth", title: ""}
    }
    },
    {
      mark: { type: "bar"},
      encoding: {
        x: {
          field: "startYear",
          title: "Year",
          type: "ordinal",
          timeUnit: "year"
        },
        y: { field: "baseline", type: "quantitative" },
        y2: { field: "avgGenreRatingDiff", type: "quantitative" },
        tooltip: [
          { field: "avgGenreRatingDiff", format: ".2f" },
          { field: "avgGenreRating", format: ".2f" },
          { field: "prevAvgGenreRating", format: ".2f" },
          { field: "startYear", "type": "temporal", title: "year", timeUnit: "year"},
        ],
         color: {field: "ratingGrowth", title: ""}
      }
    },
  ]
}):embed({
  $schema: "https://vega.github.io/schema/vega-lite/v4.json",
  data: { values: moviesJoinedProcessed },
  width: 800,
  height: 600,
  transform: [
    {
      filter: { field: "startYear", timeUnit: "year", range: ["2000", "2018"] }
    },
    {
      filter: `datum.mainGenre === "${selectGenre}"`
    },
    {
      joinaggregate: [
        {
          op: "mean", // q3
          field: "averageRating",
          as: "avgGenreRating"
        }
      ],
      groupby: ["mainGenre", "startYear"]
    },
    {
      aggregate: [
        {
          op: "count",
          field: "mainGenre",
          as: "countTitles"
        }
      ],
      groupby: ["mainGenre", "startYear", "avgGenreRating"]
    },
    {
      window: [
        {
          op: "lag",
          field: "avgGenreRating",
          as: "prevAvgGenreRating",
        },
         {
          op: "lead",
          field: "countTitles",
          as: "nextCountTitles",
        },
        {
          op: "lag",
          field: "startYear",
          as: "prevStartYear",
        }
      ],
    },
     {
      filter: " (datum.startYear - datum.prevStartYear) / 10e9 > 0"
    },
    {
      calculate:
        "datum.prevAvgGenreRating === null ? datum.avgGenreRating : datum.prevAvgGenreRating",
      as: "prevAvgGenreRating"
    },
    {
      calculate:
        "datum.nextCountTitles === null ? datum.countTitles : datum.nextCountTitles",
      as: "nextCountTitles"
    },
    {
      calculate: "(datum.avgGenreRating - datum.prevAvgGenreRating) /  datum.prevAvgGenreRating",
      as: "avgGenreRatingDiff"
    },
     {
      calculate: "(datum.nextCountTitles - datum.countTitles) /  datum.countTitles",
      as: "countTitlesDiff"
    },
    { calculate: "0", as: "baseline" },
     { calculate: "'ratingGrowth'", as: "ratingGrowth" },
     { calculate: "'titlesGrowth'", as: "titlesGrowth" },
    { calculate: "datum.startYear - datum.prevStartYear", as: "yearDiff" }
  ],
  layer: [
    {
      mark: { type: "bar", opacity: 0.5},
        encoding: {
        x: {
          field: "startYear",
          title: "Year",
          type: "ordinal",
          timeUnit: "year"
        },
        y: { field: "baseline", type: "quantitative", title: "countTitlesDiff, avgGenreRatingDiff" },
        y2: { field: "countTitlesDiff", type: "quantitative" },
           tooltip: [
          { field: "countTitlesDiff", format: ".2f" },
          { field: "countTitles"},
          { field: "nextCountTitles"},
             { field: "startYear", "type": "temporal", title: "year", timeUnit: "year"},
        ],
          color: {field: "titlesGrowth", title: ""}
    }
    },
    {
      mark: { type: "bar"},
      encoding: {
        x: {
          field: "startYear",
          title: "Year",
          type: "ordinal",
          timeUnit: "year"
        },
        y: { field: "baseline", type: "quantitative" },
        y2: { field: "avgGenreRatingDiff", type: "quantitative" },
        tooltip: [
          { field: "avgGenreRatingDiff", format: ".2f" },
          { field: "avgGenreRating", format: ".2f" },
          { field: "prevAvgGenreRating", format: ".2f" },
          { field: "startYear", "type": "temporal", title: "year", timeUnit: "year"},
        ],
         color: {field: "ratingGrowth", title: ""}
      }
    },
  ]
})

}
)}

function _ratingcountchart(group,randcolorgenre,embed,listGenre2,randomColo2r){return(
function ratingcountchart(moviesJoinedProcessed,selectGenre,topGenres,range){
   let grdt = group(moviesJoinedProcessed.filter(x=>x.startYear==range[1]))
  .by(d=>d.mainGenre)
  .orderBy(d=>d.key)
  .run() // This returns array
  .map(grouped=>{
     const Ratingg = grouped.values.map(d=>parseFloat(d.Rating));
     return Object.assign({id:grouped.key,count:grouped.values.length}
     )
  }).sort(function(a, b){return -a.count + b.count})
  let genrescolor = grdt.filter(x=>x.id=="Action"||x.id=="Drama"||x.id=="Comedy"||x.id=="Adventure"||x.id=="Crime"||x.id=="Documentary").map(item=>item.id)
  let colorlist = genrescolor.map((item,index)=>{return randcolorgenre[genrescolor[index]]})
  return (selectGenre==='top')?embed({
  $schema: "https://vega.github.io/schema/vega-lite/v4.json",
  data: { values: moviesJoinedProcessed },
  transform: [
    {
      filter: { field: "startYear", timeUnit: "year", range: range }
    },
    {
      joinaggregate: [
        {
          op: "mean",// q3
          field: "averageRating",
          as: "avgGenreRating"
        }
      ],
      groupby: ["mainGenre", "startYear"]
    },
    {
      aggregate: [
        {
          op: "count",
          field: "mainGenre",
          as: "countTitles"
        }
      ],
      groupby: ["mainGenre", "startYear", "avgGenreRating"]
    },
    // {
    //   window: [
    //     {
    //       op: "rank",
    //       as: "rank"
    //     }
    //   ],
    //   sort: [{ field: "countTitles", order: "descending" }],
    //   groupby: ["startYear"]
    // },
    // { filter: "datum.rank <= 10"},
    {
      filter: {"field": "mainGenre", "oneOf": topGenres }
    }
  ],
  // vconcat: [
  //   {
  width: 800,
  height: 400,
  encoding: {
    x: {
      field: "startYear",
      title: "Year",
      type: "temporal",
      timeUnit: "year",
    },
    y: {
      field: "countTitles",
      title: "Count of Movies",
      type: "quantitative",
        "scale": {"type": "log", base: 2},
    },
    color: { field: "mainGenre", type: "nominal" }
  },
  
  layer: [
    {
      mark: { type: "line"},
    },
    {
      mark: {
        type: "circle",
        opacity: 0.6,
        stroke: "black",
        strokeWidth: 1
      },
      encoding: {
        size: {
          field: "avgGenreRating",
          type: "quantitative",
          scale: {
            domain: [6, 8],
            range: [100, 1000]
          }
        },
    "color": {
      "field": "mainGenre",
      "type": "nominal",
      "scale": {
        "domain": genrescolor,
        "range": colorlist
      }
    },
        tooltip: [
          { field: "mainGenre" },
          { field: "avgGenreRating", format: ".2f" },
          { field: "countTitles" }
        ]
      }
    }
  ]
  // },
  // {
  //   width: 800,
  //   height: 60,
  //   selection: { brush: { type: "interval", encodings: ["x"], "init": {"x": "1990"} } },
  //   mark: {
  //     type: "line",
  //   },
  //   encoding: {
  //     x: {
  //       field: "startYear",
  //       title: "Year",
  //       type: "temporal",
  //       timeUnit: "year"
  //     },
  //     y: {
  //       field: "countTitles",
  //       title: "Count of Movies",
  //       type: "quantitative",
  //     },
  //     color: { field: "mainGenre", type: "nominal" },
  //   }
  // }
  // ]
})
:
embed({
  $schema: "https://vega.github.io/schema/vega-lite/v4.json",
  data: { values: moviesJoinedProcessed },
  transform: [
    {
      filter: { field: "startYear", timeUnit: "year", range: range }
    },
    {
      filter: `datum.mainGenre === "${selectGenre}"`
    },
    {
      joinaggregate: [
        {
          op: "mean",// q3
          field: "averageRating",
          as: "avgGenreRating"
        }
      ],
      groupby: ["mainGenre", "startYear"]
    },
    {
      aggregate: [
        {
          op: "count",
          field: "mainGenre",
          as: "countTitles"
        }
      ],
      groupby: ["mainGenre", "startYear", "avgGenreRating"]
    },
    // {
    //   window: [
    //     {
    //       op: "rank",
    //       as: "rank"
    //     }
    //   ],
    //   sort: [{ field: "countTitles", order: "descending" }],
    //   groupby: ["startYear"]
    // },
    // { filter: "datum.rank <= 10"},
    
  ],
  // vconcat: [
  //   {
  width: 800,
  height: 400,
  encoding: {
    x: {
      field: "startYear",
      title: "Year",
      type: "temporal",
      timeUnit: "year",
    },
    y: {
      field: "countTitles",
      title: "Count of Movies",
      type: "quantitative",
        "scale": {"type": "log", base: 2},
    },
    color: { field: "mainGenre", type: "nominal" }
  },
  
  layer: [
    {
      mark: { type: "line"},
    },
    {
      mark: {
        type: "circle",
        opacity: 0.6,
        stroke: "black",
        strokeWidth: 1
      },
      encoding: {
        size: {
          field: "avgGenreRating",
          type: "quantitative",
          scale: {
            domain: [6, 8],
            range: [100, 1000]
          }
        },
    "color": {
      "field": "mainGenre",
      "type": "nominal",
      "scale": {
        "domain": [listGenre2[listGenre2.indexOf(selectGenre)]],
        "range": [randomColo2r[listGenre2.indexOf(selectGenre)]]
      }
    },
        tooltip: [
          { field: "mainGenre" },
          { field: "avgGenreRating", format: ".2f" },
          { field: "countTitles" }
        ]
      }
    }
  ]
  // },
  // {
  //   width: 800,
  //   height: 60,
  //   selection: { brush: { type: "interval", encodings: ["x"], "init": {"x": "1990"} } },
  //   mark: {
  //     type: "line",
  //   },
  //   encoding: {
  //     x: {
  //       field: "startYear",
  //       title: "Year",
  //       type: "temporal",
  //       timeUnit: "year"
  //     },
  //     y: {
  //       field: "countTitles",
  //       title: "Count of Movies",
  //       type: "quantitative",
  //     },
  //     color: { field: "mainGenre", type: "nominal" },
  //   }
  // }
  // ]
});
}
)}

function _35(listGenre2){return(
[listGenre2[listGenre2.indexOf("Action")]]
)}

function _countofgenres(embed,listGenre2,randomColo2r){return(
function countofgenres(moviesJoinedProcessed){
  return embed({
  $schema: "https://vega.github.io/schema/vega-lite/v4.json",
  data: { values: moviesJoinedProcessed },
  width: 800,
  height: 600,
  transform: [
    {
      aggregate: [
        {
          op: "count",
          field: "mainGenre",
          as: "countTitles"
        }
      ],
      groupby: ["mainGenre", "startYear"]
    },
  ],
   "mark": "point",
   "encoding": {
      x: {
          field: "startYear",
          title: "Year",
          type: "ordinal",
          timeUnit: "year"
        },
      "y": {
          "field": "mainGenre",
          "type": "nominal",
          "title": "Genre"
      },
      "size": {
          "field": "countTitles",
          "type": "quantitative",
          scale: {
            // domain: [1, 2000],
            range: [4, 600]
          }
      },
    "color": {
      "field": "mainGenre",
      "type": "nominal",
      "scale": {
        "domain": listGenre2,
        "range": randomColo2r
      },
      "legend":null
    },
     tooltip: [
          { field: "countTitles", title: "titles" },
          { field: "mainGenre", title: "genre"},
          { field: "startYear", "type": "temporal", title: "year", timeUnit: "year"},
        ],
  }
})
}
)}

function _dataprocess2(col3,col33){return(
function dataprocess2(data) {
  return col3(col33(data))
}
)}

function _castFlatMap(data){return(
function castFlatMap(data2){
return  data.flatMap(({	Cast,...rest} )=> {let cs= 	Cast.split("|") ;return {	Cast:cs,...rest}}).flatMap(({Cast,...rest} )=> { return Cast.map(Cast=>({Cast,...rest}))});
}
)}

export default function define(runtime, observer) {
  const main = runtime.module();
  function toString() { return this.url; }
  const fileAttachments = new Map([
    ["dream.txt", {url: new URL("./files/929c5d4dc3c28e866a026b7f3403ab748c763dd385322f9dc657a5551e062d09fa5c7eb501b1efa2c0acc476146a9a18a70164806bd844cb4276985c0dd0bf23.txt", import.meta.url), mimeType: "text/plain", toString}],
    ["Hydra-Movie-Scrape.csv", {url: new URL("./files/20baa06a92464b17d51fddea7a19b20bd8126385a67b637a4b5a51144854c4bcc2a801348acb988b68f4cef45df0ddeaba2cfe999fc495b38c6f9f5450e56958.csv", import.meta.url), mimeType: "text/csv", toString}]
  ]);
  main.builtin("FileAttachment", runtime.fileAttachments(name => fileAttachments.get(name)));
  main.variable(observer()).define(["md"], _1);
  main.variable(observer("data")).define("data", ["FileAttachment"], _data);
  main.variable(observer()).define(["howto"], _4);
  main.variable(observer("viewof source")).define("viewof source", ["Inputs","FileAttachment","width"], _source);
  main.variable(observer("source")).define("source", ["Generators", "viewof source"], (G, _) => G.input(_));
  main.variable(observer()).define(["md"], _6);
  main.variable(observer("randomColor")).define("randomColor", _randomColor);
  main.variable(observer("randomColo2r333")).define("randomColo2r333", _randomColo2r333);
  main.variable(observer("randomColo2r")).define("randomColo2r", _randomColo2r);
  main.variable(observer("listGenre")).define("listGenre", _listGenre);
  main.variable(observer("listGenre2")).define("listGenre2", _listGenre2);
  main.variable(observer("randcolorgenre")).define("randcolorgenre", ["randomColo2r","listGenre2"], _randcolorgenre);
  main.variable(observer("WordCloud2")).define("WordCloud2", ["d3","d3Cloud"], _WordCloud2);
  main.variable(observer("WordCloud")).define("WordCloud", ["d3","d3Cloud","randcolorgenre"], _WordCloud);
  main.variable(observer()).define(["md"], _15);
  main.variable(observer()).define(["md"], _16);
  main.variable(observer("words")).define("words", ["source","stopwords"], _words);
  main.variable(observer()).define(["words"], _18);
  main.variable(observer("stopwords")).define("stopwords", _stopwords);
  main.variable(observer()).define(["WordCloud"], _20);
  main.variable(observer("d3Cloud")).define("d3Cloud", ["require"], _d3Cloud);
  const child1 = runtime.module(define1);
  main.import("howto", child1);
  main.variable(observer()).define(["md"], _23);
  const child2 = runtime.module(define2);
  main.import("group", child2);
  main.variable(observer("col33")).define("col33", _col33);
  main.variable(observer("col3")).define("col3", _col3);
  main.variable(observer("col4")).define("col4", ["group"], _col4);
  main.variable(observer("data4")).define("data4", ["group"], _data4);
  main.variable(observer("dataend")).define("dataend", _dataend);
  main.variable(observer("dataprocess")).define("dataprocess", ["dataend","data4","col4","col3","col33"], _dataprocess);
  main.variable(observer("listGenres")).define("listGenres", ["d3","col33"], _listGenres);
  main.variable(observer("embed")).define("embed", ["require"], _embed);
  main.variable(observer("ratingdripoff")).define("ratingdripoff", ["embed"], _ratingdripoff);
  main.variable(observer("ratingcountchart")).define("ratingcountchart", ["group","randcolorgenre","embed","listGenre2","randomColo2r"], _ratingcountchart);
  main.variable(observer()).define(["listGenre2"], _35);
  main.variable(observer("countofgenres")).define("countofgenres", ["embed","listGenre2","randomColo2r"], _countofgenres);
  main.variable(observer("dataprocess2")).define("dataprocess2", ["col3","col33"], _dataprocess2);
  main.variable(observer("castFlatMap")).define("castFlatMap", ["data"], _castFlatMap);
  return main;
}
