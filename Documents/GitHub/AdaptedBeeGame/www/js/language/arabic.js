var language = "arabic";

// for thesis purposes

var feedback = [];


var letters = [
  {id:1, text:"خ", audio:"Khaa'a"},
  {id:2, text:"ح", audio:"Haa'a"},
  {id:3, text:"ج", audio:"Jeem"},
  {id:4, text:"ث", audio:"Thaa'a"},
  {id:5, text:"ت", audio:"Taa'a"},
  {id:6, text:"ب", audio:"Baa'a"},
  {id:7, text:"ا", audio:"Alif"}, // for version with neighbor letters, comment out this letter (because it is not used in that version and so if this letter is chosen as a target there will be no distractors)
  {id:8, text:"ص", audio:"Sadh"},
  {id:9, text:"ش", audio:"Sheen"},
  {id:10, text:"س", audio:"Seen"},
  {id:11, text:"ز", audio:"Zaa'a"},
  {id:12, text:"ر", audio:"Raa'a"},
  {id:13, text:"ذ", audio:"Thaal"},
  {id:14, text:"د", audio:"Daal"},
  {id:15, text:"ق", audio:"Qhaaf"},
  {id:16, text:"ف", audio:"Fa'a"},
  {id:17, text:"غ", audio:"Ghayen"},
  {id:18, text:"ع", audio:"Ayen"},
  {id:19, text:"ظ", audio:"Dza'a"},
  {id:20, text:"ط", audio:"Thaa'a"},
  {id:21, text:"ض", audio:"Dhaadh"},
  {id:22, text:"ي", audio:"Yaa'a"},
  {id:23, text:"و", audio:"Wahw"},
  {id:24, text:"ه", audio:"Haa'a"}, // for version with neighbor letters, comment out this letter (because it is not used in that version and so if this letter is chosen as a target there will be no distractors)
  {id:25, text:"ن", audio:"Noon"},
  {id:26, text:"م", audio:"Meem"},
  {id:27, text:"ل", audio:"Laam"},
  {id:28, text:"ك", audio:"Kahf"} // for version with neighbor letters, comment out this letter (because it is not used in that version and so if this letter is chosen as a target there will be no distractors)
  ];


  var specialletters = [
  [{id:1, text:"خ", audio:"Khaa'a"}, 
   {id:2, text:"ح", audio:"Haa'a"},
   {id:3, text:"ج", audio:"Jeem"}, 
   {id:4, text:"غ", audio:"Ghayen"}, 
   {id:5, text:"ع", audio:"Ayen"}],
  [{id:6, text:"ث", audio:"Thaa'a"}, 
   {id:7, text:"ت", audio:"Taa'a"},
   {id:8, text:"ب", audio:"Baa'a"}, 
   {id:9, text:"ن", audio:"Noon"}, 
   {id:10, text:"ط", audio:"Thaa'a"}],
  [{id:11, text:"ز", audio:"Zaa'a"}, 
    {id:12, text:"د", audio:"Daal"},
    {id:13, text:"ر", audio:"Raa'a"}, 
    {id:14, text:"ذ", audio:"Zaa'a"}, 
    {id:15, text:"ل", audio:"Laam"}],
  [{id:16, text:"ص", audio:"Sadh"}, 
   {id:17, text:"ش", audio:"Sheen"},
   {id:18, text:"س", audio:"Seen"}, 
   {id:19, text:"ض", audio:"Dhaadh"}, 
   {id:20, text:"م", audio:"Meem"}],
  [{id:21, text:"ف", audio:"Fa'a"}, 
   {id:22, text:"ق", audio:"Qhaaf"}, 
   {id:23, text:"ي", audio:"Yaa'a"}, 
   {id:24, text:"و", audio:"Wahw"}, 
   {id:25, text:"ظ", audio:"Dza'a"}]
  ];