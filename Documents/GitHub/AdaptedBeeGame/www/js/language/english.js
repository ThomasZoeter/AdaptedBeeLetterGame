var language = "english";

// try again! let's go! i'm bored?
var feedback = [
  {id:"good_job", text:"good job", audio:"good_job"},
  {id:"welcome", text:"welcome", audio:"welcome"},
  {id:"go", text:"go", audio:"go"},
  {id:"goodbye", text:"goodbye", audio:"goodbye"}
];

var numbers = [
//  {id:"0", audio:"zero", text:"zero"},
  {id:"1", audio:"1", text:"one"},
  {id:"2", audio:"2", text:"two"},
  {id:"3", audio:"3", text:"three"},
  {id:"4", audio:"4", text:"four"},
  {id:"5", audio:"5", text:"five"},
  {id:"6", audio:"6", text:"six"},
  {id:"7", audio:"7", text:"seven"},
  {id:"8", audio:"8", text:"eight"},
  {id:"9", audio:"9", text:"nine"},
  {id:"10", audio:"10", text:"ten"},
  {id:"11", audio:"11", text:"eleven"},
  {id:"12", audio:"12", text:"twelve"},
  {id:"13", audio:"13", text:"thirteen"},
  {id:"14", audio:"14", text:"fourteen"},
  {id:"15", audio:"15", text:"fifteen"},
  {id:"16", audio:"16", text:"sixteen"},
  {id:"17", audio:"17", text:"seventeen"},
  {id:"18", audio:"18", text:"eighteen"},
  {id:"19", audio:"19", text:"nineteen"},
  {id:"20", audio:"20", text:"twenty"},
  {id:"21", audio:"21", text:"twenty-one"},
  {id:"22", audio:"22", text:"twenty-two"},
  {id:"23", audio:"23", text:"twenty-three"},
  {id:"24", audio:"24", text:"twenty-four"},
  {id:"25", audio:"25", text:"twenty-five"},
  {id:"26", audio:"26", text:"twenty-six"},
  {id:"27", audio:"27", text:"twenty-seven"},
  {id:"28", audio:"28", text:"twenty-eight"},
  {id:"29", audio:"29", text:"twenty-nine"},
  {id:"30", audio:"30", text:"thirty"},
  {id:"31", audio:"31", text:"thirty-one"},
  {id:"32", audio:"32", text:"thirty-two"},
  {id:"33", audio:"33", text:"thirty-three"},
  {id:"34", audio:"34", text:"thirty-four"},
  {id:"35", audio:"35", text:"thirty-five"},
  {id:"36", audio:"36", text:"thirty-six"},
  {id:"37", audio:"37", text:"thirty-seven"},
  {id:"38", audio:"38", text:"thirty-eight"},
  {id:"39", audio:"39", text:"thirty-nine"},
  {id:"40", audio:"forty", text:"forty"},
  {id:"41", audio:"41", text:"forty-one"},
  {id:"42", audio:"42", text:"forty-two"},
  {id:"43", audio:"43", text:"forty-three"},
  {id:"44", audio:"44", text:"forty-four"},
  {id:"45", audio:"45", text:"forty-five"},
  {id:"46", audio:"46", text:"forty-six"},
  {id:"47", audio:"47", text:"forty-seven"},
  {id:"48", audio:"48", text:"forty-eight"},
  {id:"49", audio:"49", text:"forty-nine"},
  {id:"50", audio:"fifty", text:"fifty"},
  {id:"51", audio:"51", text:"fifty-one"},
  {id:"52", audio:"52", text:"fifty-two"},
  {id:"53", audio:"53", text:"fifty-three"},
  {id:"54", audio:"54", text:"fifty-four"},
  {id:"55", audio:"55", text:"fifty-five"},
  {id:"56", audio:"56", text:"fifty-six"},
  {id:"57", audio:"57", text:"fifty-seven"},
  {id:"58", audio:"58", text:"fifty-eight"},
  {id:"59", audio:"59", text:"fifty-nine"},
  {id:"60", audio:"sixty", text:"sixty"}, // above 60 use digitsToVoice
  {id:"70", audio:"seventy", text:"seventy"},
  {id:"80", audio:"eighty", text:"eighty"},
  {id:"90", audio:"ninety", text:"ninety"},
  {id:"100", audio:"hundred", text:"hundred"},
  {id:"1000", audio:"thousand", text:"thousand"}
  ];

  // Convert numbers to words
  // copyright 25th July 2006, by Stephen Chapman http://javascript.about.com
  // permission to use this Javascript on your web page is granted
  // provided that all of the code (including this copyright notice) is
  // used exactly as shown (you can change the numbering system if you wish)
  var th = ['','thousand','million', 'billion','trillion'];
  var dg = ['zero','one','two','three','four','five','six','seven','eight','nine'];
  var tn = ['ten','eleven','twelve','thirteen', 'fourteen','fifteen','sixteen','seventeen','eighteen','nineteen'];
  var tw = ['twenty','thirty','forty','fifty','sixty','seventy','eighty','ninety'];

  function digitsToText(s) {
    s = s.toString();
    s = s.replace(/[\, ]/g,'');
    if (s != parseFloat(s)) return -1; // not a number
    var x = s.indexOf('.');
    if (x == -1) x = s.length;
    if (x > 15) return s; // too big
    var n = s.split('');
    var str = '';
    var sk = 0;
    for (var i=0; i < x; i++) {
      if((x-i)%3==2) {
        if (n[i] == '1') {
          str += tn[Number(n[i+1])] + ' '; i++; sk=1;
        } else if (n[i]!=0) {
          str += tw[n[i]-2] + ' ';sk=1;
        }
      } else if (n[i]!=0) {
        str += dg[n[i]] +' ';
        if ((x-i)%3==0) str += 'hundred ';
        sk=1;
      } if ((x-i)%3==1) {
        if (sk) str += th[(x-i-1)/3] + ' ';sk=0;
      }
    } if (x != s.length) {
      var y = s.length;
      str += 'point ';
      for (var i=x+1; i<y; i++) str += dg[n[i]] +' ';
    }
    return str.replace(/\s+/g,' ');
}


// words for each letter and syllable: https://www.youtube.com/watch?v=IUjpXWPaWE0
  /*
  {id:"", text:"", audio:""},
  {id:"", text:"", audio:""}
  */

var shapes = [
  {id:"circle", text:"circle", image:"circle", audio:"circle"},
  {id:"triangle", text:"triangle", image:"triangle-eq", audio:"triangle"},
  {id:"square", text:"square", image:"square", audio:"square"},
  {id:"rectangle", text:"rectangle", image:"rectangle", audio:"mstatili"},
  {id:"pentagon", text:"pentagon", image:"pentagon", audio:"pembetano"},
  {id:"hexagon", text:"hexagon", image:"hexagon", audio:"hexagon"},
  {id:"octagon", text:"octagon", image:"octagon", audio:"octagon"},
  {id:"star", text:"star", image:"star", audio:"star"},
  {id:"semicircle", text:"semicircle", image:"semicircle", audio:"semicircle"}
  ];

var letters = [
  {id:1, text:"خ", audio:"A"},
  {id:2, text:"ح", audio:"B"},
  {id:3, text:"ج", audio:"C"},
  {id:4, text:"ث", audio:"D"},
  {id:5, text:"ت", audio:"E"},
  {id:6, text:"ب", audio:"F"},
  {id:7, text:"ا", audio:"G"},
  {id:8, text:"ص", audio:"H"},
  {id:9, text:"ش", audio:"I"},
  {id:10, text:"س", audio:"J"},
  {id:11, text:"ز", audio:"K"},
  {id:12, text:"ر", audio:"L"},
  {id:13, text:"ذ", audio:"M"},
  {id:14, text:"د", audio:"N"},
  {id:15, text:"ق", audio:"O"},
  {id:16, text:"ف", audio:"P"},
  {id:17, text:"غ", audio:"Q"},
  {id:18, text:"ع", audio:"R"},
  {id:19, text:"ظ", audio:"S"},
  {id:20, text:"ط", audio:"T"},
  {id:21, text:"ض", audio:"U"},
  {id:22, text:"ي", audio:"V"},
  {id:23, text:"و", audio:"W"},
  {id:24, text:"ه", audio:"X"},
  {id:25, text:"ن", audio:"Y"},
  {id:26, text:"م", audio:"Z"},
  {id:27, text:"ل", audio:""},
  {id:28, text:"ك ", audio:""}
  ];

var fruit = [
  {id:"pineapple", text:"pineapple", audio:"pineapple", image:"pineapple"},
  {id:"banana", text:"banana", audio:"banana", image:"banana"},
  {id:"egg", text:"egg", audio:"egg", image:"egg"},
  {id:"orange", text:"orange", audio:"orange", image:"orange"},
  {id:"apple", text:"apple", audio:"apple", image:"apple"}, // needs audio
  {id:"mango", text:"mango", audio:"mango"},
  {id:"coconut", text:"coconut", audio:"coconut", image:"coconut"},
  {id:"grape", text:"grape", audio:"grape", image:"grape"}
]; // {id:"", text:"", audio:"", image:""},

var animals = [
  {id:"buffalo", text:"buffalo", audio:"buffalo", image:"buffalo"},
  {id:"chicken", text:"chicken", audio:"chicken", image:"chicken"},
  {id:"octopus", text:"octopus", audio:"octopus", image:"octopus"},
  {id:"cheetah", text:"cheetah", audio:"cheetah", image:"cheetah"},
  {id:"bird", text:"bird", audio:"bird", image:"bird"},
  {id:"cat", text:"cat", audio:"cat", image:"cat"},
  {id:"shark", text:"shark", audio:"shark", image:"shark"},
  {id:"anchovy", text:"anchovy", audio:"anchovy"},
  {id:"squid", text:"squid", audio:"squid"},
  {id:"fish", text:"fish", audio:"fish", image:"fish"},
  {id:"elephant", text:"elephant", image:"elephant"},
  {id:"baboon", text:"baboon", audio:"baboon"},
  {id:"crab", text:"crab", audio:"crab"}, // , image:"crab"
  {id:"dog", text:"dog", audio:"dog", image:"dog"},
  {id:"monkey", text:"monkey", audio:"monkey", image:"monkey"},
  {id:"rhinoceros", text:"rhinoceros", audio:"rhinoceros", image:"rhinoceros"},
  {id:"sheep", text:"sheep", audio:"sheep", image:"sheep"},
  {id:"zebra", text:"zebra", audio:"zebra", image:"zebra"},
  {id:"snake", text:"snake", audio:"snake", image:"snake"},
  {id:"pig", text:"pig", audio:"pig", image:"pig"},
  {id:"ostrich", text:"ostrich", audio:"ostrich", image:"ostrich"},
  {id:"lion", text:"lion", audio:"lion", image:"lion"},
  {id:"hippopotamus", text:"hippopotamus", audio:"hippopotamus", image:"hippo"},
  {id:"leopard", text:"leopard", audio:"leopard", image:"leopard"},
  {id:"goat", text:"goat", audio:"goat", image:"goat"},
  {id:"deer", text:"deer", audio:"deer", image:"deer"},
  {id:"cow", text:"cow", audio:"cow", image:"cow"},
  {id:"horse", text:"horse", audio:"horse", image:"horse"},
  {id:"seagull", text:"seagull", audio:"seagull"}
  ];



var objects = animals.concat(fruit).concat([
  {id:"bicycle", text:"bicycle", audio:"bicycle", image:"bicycle"},
  {id:"motorcycle", text:"motorcycle", audio:"motorcycle", image:"motorcycle"},
  {id:"silver", text:"silver", audio:"silver", image:"silver"}, // also means money
  {id:"kidney", text:"kidney", audio:"kidney"},
  {id:"meat", text:"meat", audio:"meat"},
  {id:"chest", text:"chest", audio:"chest"},
  {id:"almond", text:"almond", audio:"almond"},
  {id:"cheese", text:"cheese", audio:"cheese", image:"cheese"},
  {id:"underwear", text:"underwear", audio:"underwear"},
  {id:"radio", text:"radio", audio:"radio", image:"radio"},
  {id:"tree", text:"tree", audio:"tree"},
  {id:"plant", text:"plant", audio:"plant"},
  {id:"neck", text:"neck", audio:"neck"},
  {id:"armpit", text:"armpit", audio:"armpit"},
  {id:"diamond", text:"diamond", audio:"diamond", image:"diamond"},
  {id:"mouth", text:"mouth", audio:"mouth", image:"mouth"},
  {id:"eye", text:"eye", audio:"eye", image:"eye"},
  {id:"beard", text:"beard", audio:"beard"},
  {id:"bush", text:"bush", audio:"bush"},
  {id:"medicine", text:"medicine", audio:"medicine"},
  {id:"heart", text:"heart", audio:"heart"},
  {id:"lung", text:"lung", audio:"lung"},
  {id:"stomach", text:"stomach", audio:"stomach"},
  {id:"potato", text:"potato", audio:"potato"},
  {id:"car", text:"car", audio:"car", image:"car"},
  {id:"danger", text:"danger", audio:"danger", image:"danger"},
  {id:"drink", text:"drink", audio:"drink", image:"drink"},
  {id:"school", text:"school", audio:"school"},
  {id:"earth", text:"earth", audio:"earth", image:"earth"},
  {id:"sword", text:"sword", audio:"sword"},
  {id:"fruit", text:"fruit", audio:"fruit"},
  {id:"flour", text:"flour", audio:"flour"},
  {id:"oil", text:"oil", audio:"oil"},
  {id:"mountain", text:"mountain", audio:"mountain"}
]);

// {id:"", text:"", audio:""},
var words = [
  {text: "the", audio: "the", id: "the"}, {text: "of", audio: "of", id: "of"},
  {text: "to", audio: "to", id: "to"}, {text: "and", audio: "and", id: "and"},
  {text: "a", audio: "a", id: "a"}, {text: "in", audio: "in", id: "in"}, {text: "is", audio: "is", id: "is"},
  {text: "it", audio: "it", id: "it"}, {text: "you", audio: "you", id: "you"}, {text: "that", audio: "that", id: "that"},
  {text: "he", audio: "he", id: "he"}, {text: "was", audio: "was", id: "was"}, {text: "for", audio: "for", id: "for"},
  {text: "on", audio: "on", id: "on"}, {text: "are", audio: "are", id: "are"}, {text: "with", audio: "with", id: "with"},
  {id:"dust", text:"dust", audio:"dust"},
  {id:"veil", text:"veil", audio:"veil"},
  {id:"news", text:"news", audio:"news"},
  {id:"dew", text:"dew", audio:"dew"},
  {id:"fog", text:"fog", audio:"fog"},
  {id:"I", text:"I", audio:"I"},
  {id:"you_all", text:"you all", audio:"you_all"},
  {id:"bitter", text:"bitter", audio:"bitter"},
  {id:"okay", text:"okay", audio:"okay"},
  {id:"sweet", text:"sweet", audio:"sweet"},
  {id:"there", text:"there", audio:"there"},
  {id:"thank_you", text:"thank you", audio:"thank_you"},
  {id:"apologize", text:"apologize", audio:"apologize"},
  {id:"sorry", text:"sorry", audio:"sorry"},
  {id:"Saturday", text:"Saturday", audio:"Saturday"},
  {id:"Sunday", text:"Sunday", audio:"Sunday"},
  {id:"Monday", text:"Monday", audio:"Monday"},
  {id:"Tuesday", text:"Tuesday", audio:"Tuesday"},
  {id:"Wednesday", text:"Wednesday", audio:"Wednesday"},
  {id:"Thursday", text:"Thursday", audio:"Thursday"},
  {id:"Friday", text:"Friday", audio:"Friday"},
  {id:"yesterday", text:"yesterday", audio:"yesterday"},
  {id:"tomorrow", text:"tomorrow", audio:"tomorrow"},
  {id:"secret", text:"secret", audio:"secret"},
  {id:"journey", text:"journey", audio:"journey"},
  {id:"pilot", text:"pilot", audio:"pilot"},
  {id:"expensive", text:"expensive", audio:"expensive"},
  {id:"vegetable", text:"vegetable", audio:"vegetable"},
  {id:"calf", text:"calf", audio:"calf", image:"calf"},
  {id:"cheek", text:"cheek", audio:"cheek"},
  {id:"hunger", text:"hunger", audio:"hunger"},
  {id:"coastal", text:"coastal", audio:"coastal"},
  {id:"darkness", text:"darkness", audio:"darkness"},
  {id:"shadows", text:"shadows", audio:"shadows"},
  {id:"storm", text:"storm", audio:"storm"},
  {id:"healthy", text:"healthy", audio:"healthy"},
  {id:"weak", text:"weak", audio:"weak"}
  ];


  //shapes.push(new Stimulus({id:"", text:"", image:"", audio:""}));
  // shapes.push(new Stimulus({id:"star", text:"star", image:"star", audio:"star"}));
  // shapes.push(new Stimulus({id:"semicircle", text:"semicircle", image:"semicircle", audio:"semicircle"}));
  // shapes.push(new Stimulus({id:"circle", text:"circle", image:"circle", audio:"circle"}));
  // shapes.push(new Stimulus({id:"triangle", text:"triangle", image:"triangle-eq", audio:"triangle"}));
  // shapes.push(new Stimulus({id:"square", text:"square", image:"square", audio:"square"}));
  // shapes.push(new Stimulus({id:"rectangle", text:"rectangle", image:"rectangle", audio:"rectangle"}));
  // shapes.push(new Stimulus({id:"pentagon", text:"pentagon", image:"pentagon", audio:"pentagon"}));
  // shapes.push(new Stimulus({id:"hexagon", text:"hexagon", image:"hexagon", audio:"hexagon"}));
  // shapes.push(new Stimulus({id:"octagon", text:"octagon", image:"octagon", audio:"octagon"}));

words = words.concat([
  {text: "as", audio: "as", id: "as"}, {text: "his", audio: "his", id: "his"},
  {text: "they", audio: "they", id: "they"}, {text: "be", audio: "be", id: "be"}, {text: "at", audio: "at", id: "at"},
  {text: "one", audio: "one", id: "one"}, {text: "have", audio: "have", id: "have"}, {text: "this", audio: "this", id: "this"},
  {text: "from", audio: "from", id: "from"}, {text: "or", audio: "or", id: "or"}, {text: "had", audio: "had", id: "had"},
  {text: "by", audio: "by", id: "by"}, {text: "hot", audio: "hot", id: "hot"}, {text: "word", audio: "word", id: "word"},
  {text: "but", audio: "but", id: "but"}, {text: "what", audio: "what", id: "what"}, {text: "some", audio: "some", id: "some"},
  {text: "we", audio: "we", id: "we"}, {text: "can", audio: "can", id: "can"}, {text: "out", audio: "out", id: "out"},
  {text: "other", audio: "other", id: "other"}, {text: "were", audio: "were", id: "were"}, {text: "all", audio: "all", id: "all"}, {text: "there", audio: "there", id: "there"},
  {text: "when", audio: "when", id: "when"}, {text: "up", audio: "up", id: "up"}, {text: "use", audio: "use", id: "use"}, {text: "your", audio: "your", id: "your"},
  {text: "how", audio: "how", id: "how"}, {text: "said", audio: "said", id: "said"}, {text: "an", audio: "an", id: "an"}, {text: "each", audio: "each", id: "each"},
  {text: "she", audio: "she", id: "she"}, {text: "which", audio: "which", id: "which"}, {text: "do", audio: "do", id: "do"}, {text: "their", audio: "their", id: "their"}, {text: "time", audio: "time", id: "time"},
  {text: "if", audio: "if", id: "if"}, {text: "will", audio: "will", id: "will"}, {text: "way", audio: "way", id: "way"}, {text: "about", audio: "about", id: "about"}, {text: "many", audio: "many", id: "many"},
  {text: "then", audio: "then", id: "then"}, {text: "them", audio: "them", id: "them"}, {text: "write", audio: "write", id: "write"}, {text: "would", audio: "would", id: "would"}, {text: "like", audio: "like", id: "like"},
  {text: "so", audio: "so", id: "so"}, {text: "these", audio: "these", id: "these"}, {text: "her", audio: "her", id: "her"}, {text: "long", audio: "long", id: "long"}, {text: "make", audio: "make", id: "make"},
  {text: "thing", audio: "thing", id: "thing"}, {text: "see", audio: "see", id: "see"}, {text: "him", audio: "him", id: "him"}, {text: "two", audio: "two", id: "two"},
  {text: "has", audio: "has", id: "has"}, {text: "look", audio: "look", id: "look"}, {text: "more", audio: "more", id: "more"}, {text: "day", audio: "day", id: "day"}, {text: "could", audio: "could", id: "could"},
  {text: "go", audio: "go", id: "go"}, {text: "come", audio: "come", id: "come"}, {text: "did", audio: "did", id: "did"}, {text: "number", audio: "number", id: "number"}, {text: "sound", audio: "sound", id: "sound"},
  {text: "no", audio: "no", id: "no"}, {text: "most", audio: "most", id: "most"}, {text: "people", audio: "people", id: "people"}, {text: "my", audio: "my", id: "my"}, {text: "over", audio: "over", id: "over"},
  {text: "know", audio: "know", id: "know"}, {text: "water", audio: "water", id: "water"}, {text: "than", audio: "than", id: "than"}, {text: "call", audio: "call", id: "call"}, {text: "first", audio: "first", id: "first"},
  {text: "who", audio: "who", id: "who"}, {text: "may", audio: "may", id: "may"}, {text: "down", audio: "down", id: "down"}, {text: "side", audio: "side", id: "side"}, {text: "been", audio: "been", id: "been"},
  {text: "now", audio: "now", id: "now"}, {text: "find", audio: "find", id: "find"}, {text: "any", audio: "any", id: "any"}, {text: "new", audio: "new", id: "new"}, {text: "work", audio: "work", id: "work"},
  {text: "part", audio: "part", id: "part"}, {text: "take", audio: "take", id: "take"}, {text: "get", audio: "get", id: "get"}, {text: "place", audio: "place", id: "place"}, {text: "made", audio: "made", id: "made"},
  {text: "live", audio: "live", id: "live"}, {text: "where", audio: "where", id: "where"}, {text: "after", audio: "after", id: "after"}, {text: "back", audio: "back", id: "back"}, {text: "little", audio: "little", id: "little"},
  {text: "only", audio: "only", id: "only"}, {text: "round", audio: "round", id: "round"}, {text: "man", audio: "man", id: "man"}, {text: "year", audio: "year", id: "year"}, {text: "came", audio: "came", id: "came"},
  {text: "show", audio: "show", id: "show"}, {text: "every", audio: "every", id: "every"}, {text: "good", audio: "good", id: "good"}, {text: "me", audio: "me", id: "me"}, {text: "give", audio: "give", id: "give"},
  {text: "our", audio: "our", id: "our"}, {text: "under", audio: "under", id: "under"}, {text: "name", audio: "name", id: "name"}, {text: "very", audio: "very", id: "very"}, {text: "through", audio: "through", id: "through"},
  {text: "just", audio: "just", id: "just"}, {text: "form", audio: "form", id: "form"}, {text: "sentence", audio: "sentence", id: "sentence"}, {text: "great", audio: "great", id: "great"},
  {text: "think", audio: "think", id: "think"}, {text: "say", audio: "say", id: "say"}, {text: "help", audio: "help", id: "help"}, {text: "low", audio: "low", id: "low"}, {text: "line", audio: "line", id: "line"},
  {text: "differ", audio: "differ", id: "differ"}, {text: "turn", audio: "turn", id: "turn"}, {text: "cause", audio: "cause", id: "cause"}, {text: "much", audio: "much", id: "much"}, {text: "mean", audio: "mean", id: "mean"},
  {text: "before", audio: "before", id: "before"}, {text: "move", audio: "move", id: "move"},
  {text: "right", audio: "right", id: "right"}, {text: "boy", audio: "boy", id: "boy"}, {text: "old", audio: "old", id: "old"}, {text: "too", audio: "too", id: "too"}, {text: "same", audio: "same", id: "same"},
  {text: "tell", audio: "tell", id: "tell"}, {text: "does", audio: "does", id: "does"}, {text: "set", audio: "set", id: "set"},
  {text: "three", audio: "three", id: "three"}, {text: "want", audio: "want", id: "want"}, {text: "air", audio: "air", id: "air"}, {text: "well", audio: "well", id: "well"}, {text: "also", audio: "also", id: "also"}, {text: "play", audio: "play", id: "play"}, {text: "small", audio: "small", id: "small"}, {text: "end", audio: "end", id: "end"}, {text: "put", audio: "put", id: "put"}, {text: "home", audio: "home", id: "home"}, {text: "read", audio: "read", id: "read"}, {text: "hand", audio: "hand", id: "hand"}, {text: "port", audio: "port", id: "port"}, {text: "large", audio: "large", id: "large"}, {text: "spell", audio: "spell", id: "spell"}, {text: "add", audio: "add", id: "add"},
  {text: "even", audio: "even", id: "even"}, {text: "land", audio: "land", id: "land"}, {text: "here", audio: "here", id: "here"}, {text: "must", audio: "must", id: "must"}, {text: "big", audio: "big", id: "big"}, {text: "high", audio: "high", id: "high"}, {text: "such", audio: "such", id: "such"}, {text: "follow", audio: "follow", id: "follow"}, {text: "act", audio: "act", id: "act"}, {text: "why", audio: "why", id: "why"}, {text: "ask", audio: "ask", id: "ask"}, {text: "men", audio: "men", id: "men"}, {text: "change", audio: "change", id: "change"}, {text: "went", audio: "went", id: "went"}, {text: "light", audio: "light", id: "light"}, {text: "kind", audio: "kind", id: "kind"},
  {text: "off", audio: "off", id: "off"}, {text: "need", audio: "need", id: "need"}, {text: "house", audio: "house", id: "house"}, {text: "picture", audio: "picture", id: "picture"}, {text: "try", audio: "try", id: "try"}, {text: "us", audio: "us", id: "us"}, {text: "again", audio: "again", id: "again"}, {text: "animal", audio: "animal", id: "animal"}, {text: "point", audio: "point", id: "point"}, {text: "mother", audio: "mother", id: "mother"}, {text: "world", audio: "world", id: "world"}, {text: "near", audio: "near", id: "near"}, {text: "build", audio: "build", id: "build"}, {text: "self", audio: "self", id: "self"}, {text: "earth", audio: "earth", id: "earth"}, {text: "father", audio: "father", id: "father"}, {text: "head", audio: "head", id: "head"}, {text: "stand", audio: "stand", id: "stand"}, {text: "own", audio: "own", id: "own"}, {text: "page", audio: "page", id: "page"}, {text: "should", audio: "should", id: "should"}, {text: "country", audio: "country", id: "country"}, {text: "found", audio: "found", id: "found"}, {text: "answer", audio: "answer", id: "answer"}, {text: "school", audio: "school", id: "school"}, {text: "grow", audio: "grow", id: "grow"}, {text: "study", audio: "study", id: "study"}, {text: "still", audio: "still", id: "still"}, {text: "learn", audio: "learn", id: "learn"}, {text: "plant", audio: "plant", id: "plant"}, {text: "cover", audio: "cover", id: "cover"}, {text: "food", audio: "food", id: "food"}, {text: "sun", audio: "sun", id: "sun"}, {text: "four", audio: "four", id: "four"}, {text: "between", audio: "between", id: "between"}, {text: "state", audio: "state", id: "state"}, {text: "keep", audio: "keep", id: "keep"}, {text: "eye", audio: "eye", id: "eye"}, {text: "never", audio: "never", id: "never"}, {text: "last", audio: "last", id: "last"}, {text: "let", audio: "let", id: "let"}, {text: "thought", audio: "thought", id: "thought"}, {text: "city", audio: "city", id: "city"}, {text: "tree", audio: "tree", id: "tree"}, {text: "cross", audio: "cross", id: "cross"}, {text: "farm", audio: "farm", id: "farm"}, {text: "hard", audio: "hard", id: "hard"}, {text: "start", audio: "start", id: "start"}, {text: "might", audio: "might", id: "might"}, {text: "story", audio: "story", id: "story"}, {text: "saw", audio: "saw", id: "saw"}, {text: "far", audio: "far", id: "far"}, {text: "sea", audio: "sea", id: "sea"}, {text: "draw", audio: "draw", id: "draw"}, {text: "left", audio: "left", id: "left"}, {text: "late", audio: "late", id: "late"}, {text: "run", audio: "run", id: "run"},
  {text: "don't", audio: "don't", id: "don't"}, {text: "while", audio: "while", id: "while"}, {text: "press", audio: "press", id: "press"}, {text: "close", audio: "close", id: "close"},
  {text: "night", audio: "night", id: "night"}, {text: "real", audio: "real", id: "real"}, {text: "life", audio: "life", id: "life"}, {text: "few", audio: "few", id: "few"},
  {text: "north", audio: "north", id: "north"}, {text: "open", audio: "open", id: "open"}, {text: "seem", audio: "seem", id: "seem"}, {text: "together", audio: "together", id: "together"},
  {text: "next", audio: "next", id: "next"}, {text: "white", audio: "white", id: "white"}, {text: "children", audio: "children", id: "children"}, {text: "begin", audio: "begin", id: "begin"},
  {text: "got", audio: "got", id: "got"}, {text: "walk", audio: "walk", id: "walk"}, {text: "example", audio: "example", id: "example"}, {text: "ease", audio: "ease", id: "ease"}, {text: "paper", audio: "paper", id: "paper"},
  {text: "group", audio: "group", id: "group"}, {text: "always", audio: "always", id: "always"}, {text: "music", audio: "music", id: "music"}, {text: "those", audio: "those", id: "those"}, {text: "both", audio: "both", id: "both"}, {text: "mark", audio: "mark", id: "mark"}, {text: "often", audio: "often", id: "often"}, {text: "letter", audio: "letter", id: "letter"}, {text: "until", audio: "until", id: "until"}, {text: "mile", audio: "mile", id: "mile"}, {text: "river", audio: "river", id: "river"}, {text: "car", audio: "car", id: "car"}, {text: "feet", audio: "feet", id: "feet"}, {text: "care", audio: "care", id: "care"}, {text: "second", audio: "second", id: "second"}, {text: "book", audio: "book", id: "book"},
  {text: "carry", audio: "carry", id: "carry"}, {text: "took", audio: "took", id: "took"}, {text: "science", audio: "science", id: "science"}, {text: "eat", audio: "eat", id: "eat"}, {text: "room", audio: "room", id: "room"}, {text: "friend", audio: "friend", id: "friend"}, {text: "began", audio: "began", id: "began"}, {text: "idea", audio: "idea", id: "idea"}, {text: "fish", audio: "fish", id: "fish"}, {text: "mountain", audio: "mountain", id: "mountain"}, {text: "stop", audio: "stop", id: "stop"}, {text: "once", audio: "once", id: "once"}, {text: "base", audio: "base", id: "base"}, {text: "hear", audio: "hear", id: "hear"}, {text: "horse", audio: "horse", id: "horse"}, {text: "cut", audio: "cut", id: "cut"},
  {text: "sure", audio: "sure", id: "sure"}, {text: "watch", audio: "watch", id: "watch"}, {text: "color", audio: "color", id: "color"}, {text: "face", audio: "face", id: "face"}, {text: "wood", audio: "wood", id: "wood"}, {text: "main", audio: "main", id: "main"}, {text: "enough", audio: "enough", id: "enough"}, {text: "plain", audio: "plain", id: "plain"}, {text: "girl", audio: "girl", id: "girl"}, {text: "usual", audio: "usual", id: "usual"}, {text: "young", audio: "young", id: "young"}, {text: "ready", audio: "ready", id: "ready"}, {text: "above", audio: "above", id: "above"}, {text: "ever", audio: "ever", id: "ever"}, {text: "red", audio: "red", id: "red"}, {text: "list", audio: "list", id: "list"},
  {text: "though", audio: "though", id: "though"}, {text: "feel", audio: "feel", id: "feel"}, {text: "talk", audio: "talk", id: "talk"}, {text: "bird", audio: "bird", id: "bird"}, {text: "soon", audio: "soon", id: "soon"}, {text: "body", audio: "body", id: "body"}, {text: "dog", audio: "dog", id: "dog"}, {text: "family", audio: "family", id: "family"}, {text: "direct", audio: "direct", id: "direct"}, {text: "pose", audio: "pose", id: "pose"}, {text: "leave", audio: "leave", id: "leave"}, {text: "song", audio: "song", id: "song"}, {text: "measure", audio: "measure", id: "measure"}, {text: "door", audio: "door", id: "door"}, {text: "product", audio: "product", id: "product"}, {text: "black", audio: "black", id: "black"},
  {text: "short", audio: "short", id: "short"}, {text: "numeral", audio: "numeral", id: "numeral"}, {text: "class", audio: "class", id: "class"},
  {text: "wind", audio: "wind", id: "wind"}, {text: "question", audio: "question", id: "question"}, {text: "happen", audio: "happen", id: "happen"}, {text: "complete", audio: "complete", id: "complete"},
  {text: "ship", audio: "ship", id: "ship"}, {text: "area", audio: "area", id: "area"}, {text: "half", audio: "half", id: "half"}, {text: "rock", audio: "rock", id: "rock"}, {text: "order", audio: "order", id: "order"},
  {text: "fire", audio: "fire", id: "fire"}, {text: "south", audio: "south", id: "south"}, {text: "problem", audio: "problem", id: "problem"}, {text: "piece", audio: "piece", id: "piece"}, {text: "told", audio: "told", id: "told"}, {text: "knew", audio: "knew", id: "knew"}, {text: "pass", audio: "pass", id: "pass"}, {text: "since", audio: "since", id: "since"}, {text: "top", audio: "top", id: "top"}, {text: "whole", audio: "whole", id: "whole"}, {text: "king", audio: "king", id: "king"}, {text: "space", audio: "space", id: "space"}, {text: "heard", audio: "heard", id: "heard"}, {text: "best", audio: "best", id: "best"}, {text: "hour", audio: "hour", id: "hour"}, {text: "better", audio: "better", id: "better"},
  {text: "true", audio: "true", id: "true"}, {text: "during", audio: "during", id: "during"}, {text: "hundred", audio: "hundred", id: "hundred"}, {text: "five", audio: "five", id: "five"}, {text: "remember", audio: "remember", id: "remember"}, {text: "step", audio: "step", id: "step"}, {text: "early", audio: "early", id: "early"}, {text: "hold", audio: "hold", id: "hold"}, {text: "west", audio: "west", id: "west"}, {text: "ground", audio: "ground", id: "ground"}, {text: "interest", audio: "interest", id: "interest"}, {text: "reach", audio: "reach", id: "reach"}, {text: "fast", audio: "fast", id: "fast"}, {text: "verb", audio: "verb", id: "verb"}, {text: "sing", audio: "sing", id: "sing"},
  {text: "listen", audio: "listen", id: "listen"}, {text: "six", audio: "six", id: "six"}, {text: "table", audio: "table", id: "table"}, {text: "travel", audio: "travel", id: "travel"}, {text: "less", audio: "less", id: "less"}, {text: "morning", audio: "morning", id: "morning"}, {text: "ten", audio: "ten", id: "ten"}, {text: "simple", audio: "simple", id: "simple"}, {text: "several", audio: "several", id: "several"}, {text: "vowel", audio: "vowel", id: "vowel"}, {text: "toward", audio: "toward", id: "toward"}, {text: "war", audio: "war", id: "war"}, {text: "lay", audio: "lay", id: "lay"}, {text: "against", audio: "against", id: "against"}, {text: "pattern", audio: "pattern", id: "pattern"},
  {text: "slow", audio: "slow", id: "slow"}, {text: "center", audio: "center", id: "center"}, {text: "love", audio: "love", id: "love"}, {text: "person", audio: "person", id: "person"}, {text: "money", audio: "money", id: "money"}, {text: "serve", audio: "serve", id: "serve"}, {text: "appear", audio: "appear", id: "appear"}, {text: "road", audio: "road", id: "road"}, {text: "map", audio: "map", id: "map"}, {text: "rain", audio: "rain", id: "rain"}, {text: "rule", audio: "rule", id: "rule"}, {text: "govern", audio: "govern", id: "govern"}, {text: "pull", audio: "pull", id: "pull"}, {text: "cold", audio: "cold", id: "cold"}, {text: "notice", audio: "notice", id: "notice"}, {text: "voice", audio: "voice", id: "voice"},
  {text: "unit", audio: "unit", id: "unit"}, {text: "power", audio: "power", id: "power"}, {text: "town", audio: "town", id: "town"}, {text: "fine", audio: "fine", id: "fine"}, {text: "certain", audio: "certain", id: "certain"}, {text: "fly", audio: "fly", id: "fly"}, {text: "fall", audio: "fall", id: "fall"}, {text: "lead", audio: "lead", id: "lead"}, {text: "cry", audio: "cry", id: "cry"}, {text: "dark", audio: "dark", id: "dark"}, {text: "machine", audio: "machine", id: "machine"}, {text: "note", audio: "note", id: "note"}, {text: "wait", audio: "wait", id: "wait"}, {text: "plan", audio: "plan", id: "plan"}, {text: "figure", audio: "figure", id: "figure"}, {text: "star", audio: "star", id: "star"},
  {text: "box", audio: "box", id: "box"}, {text: "noun", audio: "noun", id: "noun"}, {text: "field", audio: "field", id: "field"}, {text: "rest", audio: "rest", id: "rest"}, {text: "correct", audio: "correct", id: "correct"}, {text: "able", audio: "able", id: "able"}, {text: "pound", audio: "pound", id: "pound"}, {text: "done", audio: "done", id: "done"}, {text: "beauty", audio: "beauty", id: "beauty"}, {text: "drive", audio: "drive", id: "drive"}, {text: "stood", audio: "stood", id: "stood"}, {text: "contain", audio: "contain", id: "contain"}, {text: "front", audio: "front", id: "front"}, {text: "teach", audio: "teach", id: "teach"}, {text: "week", audio: "week", id: "week"}, {text: "final", audio: "final", id: "final"},
  {text: "gave", audio: "gave", id: "gave"}, {text: "green", audio: "green", id: "green"}, {text: "oh", audio: "oh", id: "oh"}, {text: "quick", audio: "quick", id: "quick"}, {text: "develop", audio: "develop", id: "develop"}, {text: "ocean", audio: "ocean", id: "ocean"}, {text: "warm", audio: "warm", id: "warm"}, {text: "free", audio: "free", id: "free"}, {text: "minute", audio: "minute", id: "minute"}, {text: "strong", audio: "strong", id: "strong"}, {text: "special", audio: "special", id: "special"}, {text: "mind", audio: "mind", id: "mind"}, {text: "behind", audio: "behind", id: "behind"}, {text: "clear", audio: "clear", id: "clear"}, {text: "tail", audio: "tail", id: "tail"}, {text: "produce", audio: "produce", id: "produce"}, {text: "fact", audio: "fact", id: "fact"}, {text: "street", audio: "street", id: "street"}, {text: "inch", audio: "inch", id: "inch"}, {text: "multiply", audio: "multiply", id: "multiply"}, {text: "nothing", audio: "nothing", id: "nothing"}, {text: "course", audio: "course", id: "course"}, {text: "stay", audio: "stay", id: "stay"}, {text: "wheel", audio: "wheel", id: "wheel"}, {text: "full", audio: "full", id: "full"}, {text: "force", audio: "force", id: "force"}, {text: "blue", audio: "blue", id: "blue"}, {text: "object", audio: "object", id: "object"}, {text: "decide", audio: "decide", id: "decide"}, {text: "surface", audio: "surface", id: "surface"}, {text: "deep", audio: "deep", id: "deep"}, {text: "moon", audio: "moon", id: "moon"}, {text: "island", audio: "island", id: "island"}, {text: "foot", audio: "foot", id: "foot"}, {text: "system", audio: "system", id: "system"}, {text: "busy", audio: "busy", id: "busy"}, {text: "test", audio: "test", id: "test"}, {text: "record", audio: "record", id: "record"}, {text: "boat", audio: "boat", id: "boat"}, {text: "common", audio: "common", id: "common"}, {text: "gold", audio: "gold", id: "gold"}, {text: "possible", audio: "possible", id: "possible"}, {text: "plane", audio: "plane", id: "plane"}, {text: "stead", audio: "stead", id: "stead"}, {text: "dry", audio: "dry", id: "dry"}, {text: "wonder", audio: "wonder", id: "wonder"}, {text: "laugh", audio: "laugh", id: "laugh"}, {text: "thousand", audio: "thousand", id: "thousand"}, {text: "ago", audio: "ago", id: "ago"}, {text: "ran", audio: "ran", id: "ran"}, {text: "check", audio: "check", id: "check"}, {text: "game", audio: "game", id: "game"}, {text: "shape", audio: "shape", id: "shape"}, {text: "equate", audio: "equate", id: "equate"},
  {text: "hot", audio: "hot", id: "hot"}, {text: "miss", audio: "miss", id: "miss"}, {text: "brought", audio: "brought", id: "brought"}, {text: "heat", audio: "heat", id: "heat"}, {text: "snow", audio: "snow", id: "snow"}, {text: "tire", audio: "tire", id: "tire"}, {text: "bring", audio: "bring", id: "bring"}, {text: "yes", audio: "yes", id: "yes"}, {text: "distant", audio: "distant", id: "distant"}, {text: "fill", audio: "fill", id: "fill"}, {text: "east", audio: "east", id: "east"}, {text: "paint", audio: "paint", id: "paint"}, {text: "language", audio: "language", id: "language"}, {text: "among", audio: "among", id: "among"}, {text: "grand", audio: "grand", id: "grand"},
  {text: "ball", audio: "ball", id: "ball"}, {text: "yet", audio: "yet", id: "yet"}, {text: "wave", audio: "wave", id: "wave"}, {text: "drop", audio: "drop", id: "drop"}, {text: "heart", audio: "heart", id: "heart"}, {text: "am", audio: "am", id: "am"}, {text: "present", audio: "present", id: "present"}, {text: "heavy", audio: "heavy", id: "heavy"}, {text: "dance", audio: "dance", id: "dance"}, {text: "engine", audio: "engine", id: "engine"}, {text: "position", audio: "position", id: "position"}, {text: "arm", audio: "arm", id: "arm"}, {text: "wide", audio: "wide", id: "wide"}, {text: "sail", audio: "sail", id: "sail"}, {text: "material", audio: "material", id: "material"}, {text: "size", audio: "size", id: "size"}, {text: "vary", audio: "vary", id: "vary"}, {text: "settle", audio: "settle", id: "settle"}, {text: "speak", audio: "speak", id: "speak"}, {text: "weight", audio: "weight", id: "weight"}, {text: "general", audio: "general", id: "general"}, {text: "ice", audio: "ice", id: "ice"}, {text: "matter", audio: "matter", id: "matter"}, {text: "circle", audio: "circle", id: "circle"}, {text: "pair", audio: "pair", id: "pair"}, {text: "include", audio: "include", id: "include"}, {text: "divide", audio: "divide", id: "divide"}, {text: "syllable", audio: "syllable", id: "syllable"}, {text: "felt", audio: "felt", id: "felt"}, {text: "perhaps", audio: "perhaps", id: "perhaps"}, {text: "pick", audio: "pick", id: "pick"}, {text: "sudden", audio: "sudden", id: "sudden"}, {text: "count", audio: "count", id: "count"}, {text: "square", audio: "square", id: "square"}, {text: "reason", audio: "reason", id: "reason"}, {text: "length", audio: "length", id: "length"}, {text: "represent", audio: "represent", id: "represent"}, {text: "art", audio: "art", id: "art"}, {text: "subject", audio: "subject", id: "subject"}, {text: "region", audio: "region", id: "region"}, {text: "energy", audio: "energy", id: "energy"}, {text: "hunt", audio: "hunt", id: "hunt"},
  {text: "probable", audio: "probable", id: "probable"}, {text: "bed", audio: "bed", id: "bed"}, {text: "brother", audio: "brother", id: "brother"}, {text: "egg", audio: "egg", id: "egg"},
  {text: "ride", audio: "ride", id: "ride"}, {text: "cell", audio: "cell", id: "cell"}, {text: "believe", audio: "believe", id: "believe"}, {text: "fraction", audio: "fraction", id: "fraction"},
  {text: "forest", audio: "forest", id: "forest"}, {text: "sit", audio: "sit", id: "sit"}, {text: "race", audio: "race", id: "race"}, {text: "window", audio: "window", id: "window"}, {text: "store", audio: "store", id: "store"}, {text: "summer", audio: "summer", id: "summer"}, {text: "train", audio: "train", id: "train"}, {text: "sleep", audio: "sleep", id: "sleep"}, {text: "prove", audio: "prove", id: "prove"}, {text: "lone", audio: "lone", id: "lone"}, {text: "leg", audio: "leg", id: "leg"}, {text: "exercise", audio: "exercise", id: "exercise"}, {text: "wall", audio: "wall", id: "wall"}, {text: "catch", audio: "catch", id: "catch"}, {text: "mount", audio: "mount", id: "mount"},
  {text: "wish", audio: "wish", id: "wish"}, {text: "sky", audio: "sky", id: "sky"}, {text: "board", audio: "board", id: "board"}, {text: "joy", audio: "joy", id: "joy"}, {text: "winter", audio: "winter", id: "winter"}, {text: "sat", audio: "sat", id: "sat"}, {text: "written", audio: "written", id: "written"}, {text: "wild", audio: "wild", id: "wild"}, {text: "instrument", audio: "instrument", id: "instrument"}, {text: "kept", audio: "kept", id: "kept"}, {text: "glass", audio: "glass", id: "glass"}, {text: "grass", audio: "grass", id: "grass"}, {text: "cow", audio: "cow", id: "cow"}, {text: "job", audio: "job", id: "job"}, {text: "edge", audio: "edge", id: "edge"}, {text: "sign", audio: "sign", id: "sign"},
  {text: "visit", audio: "visit", id: "visit"}, {text: "past", audio: "past", id: "past"}, {text: "soft", audio: "soft", id: "soft"}, {text: "fun", audio: "fun", id: "fun"}, {text: "bright", audio: "bright", id: "bright"}, {text: "gas", audio: "gas", id: "gas"}, {text: "weather", audio: "weather", id: "weather"}, {text: "month", audio: "month", id: "month"}, {text: "million", audio: "million", id: "million"}, {text: "bear", audio: "bear", id: "bear"}, {text: "finish", audio: "finish", id: "finish"}, {text: "happy", audio: "happy", id: "happy"}, {text: "hope", audio: "hope", id: "hope"}, {text: "flower", audio: "flower", id: "flower"}, {text: "clothe", audio: "clothe", id: "clothe"}, {text: "strange", audio: "strange", id: "strange"}, {text: "gone", audio: "gone", id: "gone"}, {text: "jump", audio: "jump", id: "jump"}, {text: "baby", audio: "baby", id: "baby"}, {text: "eight", audio: "eight", id: "eight"}, {text: "village", audio: "village", id: "village"}, {text: "meet", audio: "meet", id: "meet"}, {text: "root", audio: "root", id: "root"}, {text: "buy", audio: "buy", id: "buy"}, {text: "raise", audio: "raise", id: "raise"}, {text: "solve", audio: "solve", id: "solve"}, {text: "metal", audio: "metal", id: "metal"}, {text: "whether", audio: "whether", id: "whether"}, {text: "push", audio: "push", id: "push"}, {text: "seven", audio: "seven", id: "seven"}, {text: "paragraph", audio: "paragraph", id: "paragraph"}, {text: "third", audio: "third", id: "third"}, {text: "shall", audio: "shall", id: "shall"}, {text: "held", audio: "held", id: "held"}, {text: "hair", audio: "hair", id: "hair"}, {text: "describe", audio: "describe", id: "describe"}, {text: "cook", audio: "cook", id: "cook"}, {text: "floor", audio: "floor", id: "floor"}, {text: "either", audio: "either", id: "either"}, {text: "result", audio: "result", id: "result"}, {text: "burn", audio: "burn", id: "burn"}, {text: "hill", audio: "hill", id: "hill"}, {text: "safe", audio: "safe", id: "safe"}, {text: "cat", audio: "cat", id: "cat"}, {text: "century", audio: "century", id: "century"}, {text: "consider", audio: "consider", id: "consider"}, {text: "type", audio: "type", id: "type"}, {text: "law", audio: "law", id: "law"}, {text: "bit", audio: "bit", id: "bit"}, {text: "coast", audio: "coast", id: "coast"}, {text: "copy", audio: "copy", id: "copy"}, {text: "phrase", audio: "phrase", id: "phrase"}, {text: "silent", audio: "silent", id: "silent"}, {text: "tall", audio: "tall", id: "tall"}, {text: "sand", audio: "sand", id: "sand"}, {text: "soil", audio: "soil", id: "soil"}, {text: "roll", audio: "roll", id: "roll"}, {text: "temperature", audio: "temperature", id: "temperature"}, {text: "finger", audio: "finger", id: "finger"}, {text: "industry", audio: "industry", id: "industry"}, {text: "value", audio: "value", id: "value"}, {text: "fight", audio: "fight", id: "fight"}, {text: "lie", audio: "lie", id: "lie"}, {text: "beat", audio: "beat", id: "beat"}, {text: "excite", audio: "excite", id: "excite"}, {text: "natural", audio: "natural", id: "natural"}, {text: "view", audio: "view", id: "view"}, {text: "sense", audio: "sense", id: "sense"}, {text: "ear", audio: "ear", id: "ear"}, {text: "else", audio: "else", id: "else"}, {text: "quite", audio: "quite", id: "quite"}, {text: "broke", audio: "broke", id: "broke"}, {text: "case", audio: "case", id: "case"}, {text: "middle", audio: "middle", id: "middle"}, {text: "kill", audio: "kill", id: "kill"}, {text: "son", audio: "son", id: "son"}, {text: "lake", audio: "lake", id: "lake"}, {text: "moment", audio: "moment", id: "moment"}, {text: "scale", audio: "scale", id: "scale"}, {text: "loud", audio: "loud", id: "loud"}, {text: "spring", audio: "spring", id: "spring"}, {text: "observe", audio: "observe", id: "observe"}, {text: "child", audio: "child", id: "child"}, {text: "straight", audio: "straight", id: "straight"}, {text: "consonant", audio: "consonant", id: "consonant"}, {text: "nation", audio: "nation", id: "nation"}, {text: "dictionary", audio: "dictionary", id: "dictionary"}, {text: "milk", audio: "milk", id: "milk"}, {text: "speed", audio: "speed", id: "speed"}, {text: "method", audio: "method", id: "method"}, {text: "organ", audio: "organ", id: "organ"}, {text: "pay", audio: "pay", id: "pay"}, {text: "age", audio: "age", id: "age"}, {text: "section", audio: "section", id: "section"}, {text: "dress", audio: "dress", id: "dress"}, {text: "cloud", audio: "cloud", id: "cloud"}, {text: "surprise", audio: "surprise", id: "surprise"}, {text: "quiet", audio: "quiet", id: "quiet"}, {text: "stone", audio: "stone", id: "stone"}, {text: "tiny", audio: "tiny", id: "tiny"}, {text: "climb", audio: "climb", id: "climb"}, {text: "cool", audio: "cool", id: "cool"}, {text: "design", audio: "design", id: "design"}, {text: "poor", audio: "poor", id: "poor"}, {text: "lot", audio: "lot", id: "lot"}, {text: "experiment", audio: "experiment", id: "experiment"}, {text: "bottom", audio: "bottom", id: "bottom"}, {text: "key", audio: "key", id: "key"}, {text: "iron", audio: "iron", id: "iron"}, {text: "single", audio: "single", id: "single"}, {text: "stick", audio: "stick", id: "stick"}, {text: "flat", audio: "flat", id: "flat"}, {text: "twenty", audio: "twenty", id: "twenty"}, {text: "skin", audio: "skin", id: "skin"}, {text: "smile", audio: "smile", id: "smile"}, {text: "crease", audio: "crease", id: "crease"}, {text: "hole", audio: "hole", id: "hole"}, {text: "trade", audio: "trade", id: "trade"}, {text: "melody", audio: "melody", id: "melody"}, {text: "trip", audio: "trip", id: "trip"}, {text: "office", audio: "office", id: "office"}, {text: "receive", audio: "receive", id: "receive"}, {text: "row", audio: "row", id: "row"}, {text: "mouth", audio: "mouth", id: "mouth"}, {text: "exact", audio: "exact", id: "exact"}, {text: "symbol", audio: "symbol", id: "symbol"}, {text: "die", audio: "die", id: "die"}, {text: "least", audio: "least", id: "least"}, {text: "trouble", audio: "trouble", id: "trouble"}, {text: "shout", audio: "shout", id: "shout"}, {text: "except", audio: "except", id: "except"}, {text: "wrote", audio: "wrote", id: "wrote"}, {text: "seed", audio: "seed", id: "seed"}, {text: "tone", audio: "tone", id: "tone"}, {text: "join", audio: "join", id: "join"}, {text: "suggest", audio: "suggest", id: "suggest"}, {text: "clean", audio: "clean", id: "clean"}, {text: "break", audio: "break", id: "break"}, {text: "lady", audio: "lady", id: "lady"}, {text: "yard", audio: "yard", id: "yard"}, {text: "rise", audio: "rise", id: "rise"}, {text: "bad", audio: "bad", id: "bad"}, {text: "blow", audio: "blow", id: "blow"}, {text: "oil", audio: "oil", id: "oil"}, {text: "blood", audio: "blood", id: "blood"}, {text: "touch", audio: "touch", id: "touch"}, {text: "grew", audio: "grew", id: "grew"}, {text: "cent", audio: "cent", id: "cent"}, {text: "mix", audio: "mix", id: "mix"}, {text: "team", audio: "team", id: "team"}, {text: "wire", audio: "wire", id: "wire"}, {text: "cost", audio: "cost", id: "cost"}, {text: "lost", audio: "lost", id: "lost"}, {text: "brown", audio: "brown", id: "brown"}, {text: "wear", audio: "wear", id: "wear"}, {text: "garden", audio: "garden", id: "garden"}, {text: "equal", audio: "equal", id: "equal"}, {text: "sent", audio: "sent", id: "sent"}, {text: "choose", audio: "choose", id: "choose"}, {text: "fell", audio: "fell", id: "fell"}, {text: "fit", audio: "fit", id: "fit"}, {text: "flow", audio: "flow", id: "flow"}, {text: "fair", audio: "fair", id: "fair"}, {text: "bank", audio: "bank", id: "bank"}, {text: "collect", audio: "collect", id: "collect"}, {text: "save", audio: "save", id: "save"}, {text: "control", audio: "control", id: "control"}, {text: "decimal", audio: "decimal", id: "decimal"}, {text: "gentle", audio: "gentle", id: "gentle"}, {text: "woman", audio: "woman", id: "woman"}, {text: "captain", audio: "captain", id: "captain"}, {text: "practice", audio: "practice", id: "practice"}, {text: "separate", audio: "separate", id: "separate"}, {text: "difficult", audio: "difficult", id: "difficult"}, {text: "doctor", audio: "doctor", id: "doctor"}, {text: "please", audio: "please", id: "please"}, {text: "protect", audio: "protect", id: "protect"}, {text: "noon", audio: "noon", id: "noon"}, {text: "whose", audio: "whose", id: "whose"}, {text: "locate", audio: "locate", id: "locate"}, {text: "ring", audio: "ring", id: "ring"}, {text: "character", audio: "character", id: "character"}, {text: "insect", audio: "insect", id: "insect"}, {text: "caught", audio: "caught", id: "caught"}, {text: "period", audio: "period", id: "period"}, {text: "indicate", audio: "indicate", id: "indicate"}, {text: "radio", audio: "radio", id: "radio"}, {text: "spoke", audio: "spoke", id: "spoke"}, {text: "atom", audio: "atom", id: "atom"}, {text: "human", audio: "human", id: "human"}, {text: "history", audio: "history", id: "history"}, {text: "effect", audio: "effect", id: "effect"}, {text: "electric", audio: "electric", id: "electric"}, {text: "expect", audio: "expect", id: "expect"}, {text: "crop", audio: "crop", id: "crop"}, {text: "modern", audio: "modern", id: "modern"}, {text: "element", audio: "element", id: "element"}, {text: "hit", audio: "hit", id: "hit"}, {text: "student", audio: "student", id: "student"}, {text: "corner", audio: "corner", id: "corner"}, {text: "party", audio: "party", id: "party"}, {text: "supply", audio: "supply", id: "supply"}, {text: "bone", audio: "bone", id: "bone"}, {text: "rail", audio: "rail", id: "rail"}, {text: "imagine", audio: "imagine", id: "imagine"}, {text: "provide", audio: "provide", id: "provide"}, {text: "agree", audio: "agree", id: "agree"}, {text: "thus", audio: "thus", id: "thus"}, {text: "capital", audio: "capital", id: "capital"}, {text: "won't", audio: "won't", id: "won't"}, {text: "chair", audio: "chair", id: "chair"}, {text: "danger", audio: "danger", id: "danger"}, {text: "fruit", audio: "fruit", id: "fruit"}, {text: "rich", audio: "rich", id: "rich"}, {text: "thick", audio: "thick", id: "thick"}, {text: "soldier", audio: "soldier", id: "soldier"}, {text: "process", audio: "process", id: "process"}, {text: "operate", audio: "operate", id: "operate"}, {text: "guess", audio: "guess", id: "guess"}, {text: "necessary", audio: "necessary", id: "necessary"}, {text: "sharp", audio: "sharp", id: "sharp"}, {text: "wing", audio: "wing", id: "wing"}, {text: "create", audio: "create", id: "create"}, {text: "neighbor", audio: "neighbor", id: "neighbor"}, {text: "wash", audio: "wash", id: "wash"}, {text: "bat", audio: "bat", id: "bat"}, {text: "rather", audio: "rather", id: "rather"}, {text: "crowd", audio: "crowd", id: "crowd"}, {text: "corn", audio: "corn", id: "corn"}, {text: "compare", audio: "compare", id: "compare"}, {text: "poem", audio: "poem", id: "poem"}, {text: "string", audio: "string", id: "string"}, {text: "bell", audio: "bell", id: "bell"}, {text: "depend", audio: "depend", id: "depend"}, {text: "meat", audio: "meat", id: "meat"}, {text: "rub", audio: "rub", id: "rub"}, {text: "tube", audio: "tube", id: "tube"}, {text: "famous", audio: "famous", id: "famous"}, {text: "dollar", audio: "dollar", id: "dollar"}, {text: "stream", audio: "stream", id: "stream"}, {text: "fear", audio: "fear", id: "fear"}, {text: "sight", audio: "sight", id: "sight"}, {text: "thin", audio: "thin", id: "thin"}, {text: "triangle", audio: "triangle", id: "triangle"}, {text: "planet", audio: "planet", id: "planet"}, {text: "hurry", audio: "hurry", id: "hurry"}, {text: "chief", audio: "chief", id: "chief"}, {text: "colony", audio: "colony", id: "colony"}, {text: "clock", audio: "clock", id: "clock"}, {text: "mine", audio: "mine", id: "mine"}, {text: "tie", audio: "tie", id: "tie"}, {text: "enter", audio: "enter", id: "enter"}, {text: "major", audio: "major", id: "major"}, {text: "fresh", audio: "fresh", id: "fresh"}, {text: "search", audio: "search", id: "search"}, {text: "send", audio: "send", id: "send"}, {text: "yellow", audio: "yellow", id: "yellow"}, {text: "gun", audio: "gun", id: "gun"}, {text: "allow", audio: "allow", id: "allow"}, {text: "print", audio: "print", id: "print"}, {text: "dead", audio: "dead", id: "dead"}, {text: "spot", audio: "spot", id: "spot"}, {text: "desert", audio: "desert", id: "desert"}, {text: "suit", audio: "suit", id: "suit"}, {text: "current", audio: "current", id: "current"}, {text: "lift", audio: "lift", id: "lift"}, {text: "rose", audio: "rose", id: "rose"}, {text: "continue", audio: "continue", id: "continue"}, {text: "block", audio: "block", id: "block"}, {text: "chart", audio: "chart", id: "chart"}, {text: "hat", audio: "hat", id: "hat"}, {text: "sell", audio: "sell", id: "sell"}, {text: "success", audio: "success", id: "success"}, {text: "company", audio: "company", id: "company"}, {text: "subtract", audio: "subtract", id: "subtract"}, {text: "event", audio: "event", id: "event"}, {text: "particular", audio: "particular", id: "particular"}, {text: "deal", audio: "deal", id: "deal"}, {text: "swim", audio: "swim", id: "swim"}, {text: "term", audio: "term", id: "term"}, {text: "opposite", audio: "opposite", id: "opposite"}, {text: "wife", audio: "wife", id: "wife"}, {text: "shoe", audio: "shoe", id: "shoe"}, {text: "shoulder", audio: "shoulder", id: "shoulder"}, {text: "spread", audio: "spread", id: "spread"}, {text: "arrange", audio: "arrange", id: "arrange"}, {text: "camp", audio: "camp", id: "camp"}, {text: "invent", audio: "invent", id: "invent"}, {text: "cotton", audio: "cotton", id: "cotton"}, {text: "born", audio: "born", id: "born"}, {text: "determine", audio: "determine", id: "determine"}, {text: "quart", audio: "quart", id: "quart"}, {text: "nine", audio: "nine", id: "nine"}, {text: "truck", audio: "truck", id: "truck"}, {text: "noise", audio: "noise", id: "noise"}, {text: "level", audio: "level", id: "level"}, {text: "chance", audio: "chance", id: "chance"}, {text: "gather", audio: "gather", id: "gather"}, {text: "shop", audio: "shop", id: "shop"}, {text: "stretch", audio: "stretch", id: "stretch"}, {text: "throw", audio: "throw", id: "throw"}, {text: "shine", audio: "shine", id: "shine"}, {text: "property", audio: "property", id: "property"}, {text: "column", audio: "column", id: "column"}, {text: "molecule", audio: "molecule", id: "molecule"}, {text: "select", audio: "select", id: "select"}, {text: "wrong", audio: "wrong", id: "wrong"}, {text: "gray", audio: "gray", id: "gray"}, {text: "repeat", audio: "repeat", id: "repeat"}, {text: "require", audio: "require", id: "require"}, {text: "broad", audio: "broad", id: "broad"}, {text: "prepare", audio: "prepare", id: "prepare"}, {text: "salt", audio: "salt", id: "salt"}, {text: "nose", audio: "nose", id: "nose"}, {text: "plural", audio: "plural", id: "plural"}, {text: "anger", audio: "anger", id: "anger"}, {text: "claim", audio: "claim", id: "claim"}, {text: "continent", audio: "continent", id: "continent"}, {text: "oxygen", audio: "oxygen", id: "oxygen"}, {text: "sugar", audio: "sugar", id: "sugar"}, {text: "death", audio: "death", id: "death"}, {text: "pretty", audio: "pretty", id: "pretty"}, {text: "skill", audio: "skill", id: "skill"}, {text: "women", audio: "women", id: "women"}, {text: "season", audio: "season", id: "season"}, {text: "solution", audio: "solution", id: "solution"}, {text: "magnet", audio: "magnet", id: "magnet"}, {text: "silver", audio: "silver", id: "silver"}, {text: "thank", audio: "thank", id: "thank"}, {text: "branch", audio: "branch", id: "branch"}, {text: "match", audio: "match", id: "match"}, {text: "suffix", audio: "suffix", id: "suffix"}, {text: "especially", audio: "especially", id: "especially"}, {text: "fig", audio: "fig", id: "fig"}, {text: "afraid", audio: "afraid", id: "afraid"}, {text: "huge", audio: "huge", id: "huge"}, {text: "sister", audio: "sister", id: "sister"}, {text: "steel", audio: "steel", id: "steel"}, {text: "discuss", audio: "discuss", id: "discuss"},
  {text: "forward", audio: "forward", id: "forward"}, {text: "similar", audio: "similar", id: "similar"},
  {text: "guide", audio: "guide", id: "guide"}, {text: "experience", audio: "experience", id: "experience"},
  {text: "score", audio: "score", id: "score"}, {text: "apple", audio: "apple", id: "apple"},
  {text: "bought", audio: "bought", id: "bought"}, {text: "led", audio: "led", id: "led"}, {text: "pitch", audio: "pitch", id: "pitch"},
  {text: "coat", audio: "coat", id: "coat"}, {text: "mass", audio: "mass", id: "mass"}, {text: "card", audio: "card", id: "card"}, {text: "band", audio: "band", id: "band"},
  {text: "rope", audio: "rope", id: "rope"}, {text: "slip", audio: "slip", id: "slip"}, {text: "win", audio: "win", id: "win"},
  {text: "dream", audio: "dream", id: "dream"}, {text: "evening", audio: "evening", id: "evening"}, {text: "condition", audio: "condition", id: "condition"},
  {text: "feed", audio: "feed", id: "feed"}, {text: "tool", audio: "tool", id: "tool"}, {text: "total", audio: "total", id: "total"}, {text: "basic", audio: "basic", id: "basic"},
  {text: "smell", audio: "smell", id: "smell"},
  {text: "valley", audio: "valley", id: "valley"}, {text: "nor", audio: "nor", id: "nor"}, {text: "double", audio: "double", id: "double"}, {text: "seat", audio: "seat", id: "seat"},
  {text: "arrive", audio: "arrive", id: "arrive"}, {text: "master", audio: "master", id: "master"}, {text: "track", audio: "track", id: "track"},
  {text: "parent", audio: "parent", id: "parent"}, {text: "shore", audio: "shore", id: "shore"},
  {text: "division", audio: "division", id: "division"}, {text: "sheet", audio: "sheet", id: "sheet"},
  {text: "substance", audio: "substance", id: "substance"}, {text: "favor", audio: "favor", id: "favor"},
  {text: "connect", audio: "connect", id: "connect"}, {text: "post", audio: "post", id: "post"},
  {text: "spend", audio: "spend", id: "spend"}, {text: "chord", audio: "chord", id: "chord"},
  {text: "fat", audio: "fat", id: "fat"}, {text: "glad", audio: "glad", id: "glad"},
  {text: "original", audio: "original", id: "original"}, {text: "share", audio: "share", id: "share"},
  {text: "station", audio: "station", id: "station"}, {text: "dad", audio: "dad", id: "dad"},
  {text: "bread", audio: "bread", id: "bread"}, {text: "charge", audio: "charge", id: "charge"}, {text: "proper", audio: "proper", id: "proper"},
  {text: "bar", audio: "bar", id: "bar"}, {text: "offer", audio: "offer", id: "offer"},
  {text: "segment", audio: "segment", id: "segment"}, {text: "slave", audio: "slave", id: "slave"},
  {text: "duck", audio: "duck", id: "duck"}, {text: "instant", audio: "instant", id: "instant"},
  {text: "market", audio: "market", id: "market"}, {text: "degree", audio: "degree", id: "degree"},
  {text: "populate", audio: "populate", id: "populate"}, {text: "chick", audio: "chick", id: "chick"},
  {text: "dear", audio: "dear", id: "dear"}, {text: "enemy", audio: "enemy", id: "enemy"},
  {text: "reply", audio: "reply", id: "reply"}, {text: "drink", audio: "drink", id: "drink"},
  {text: "occur", audio: "occur", id: "occur"}, {text: "support", audio: "support", id: "support"},
  {text: "speech", audio: "speech", id: "speech"}, {text: "nature", audio: "nature", id: "nature"},
  {text: "range", audio: "range", id: "range"}, {text: "steam", audio: "steam", id: "steam"},
  {text: "motion", audio: "motion", id: "motion"}, {text: "path", audio: "path", id: "path"},
  {text: "liquid", audio: "liquid", id: "liquid"}, {text: "log", audio: "log", id: "log"},
  {text: "meant", audio: "meant", id: "meant"}, {text: "quotient", audio: "quotient", id: "quotient"},
  {text: "teeth", audio: "teeth", id: "teeth"}, {text: "shell", audio: "shell", id: "shell"}, {text: "neck", audio: "neck", id: "neck"}
]);
