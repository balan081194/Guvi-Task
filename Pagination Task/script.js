

let jsp_curren_age = 1;
const jsp_records_per_page= 5;

let datavalue=[];
async function fetchData(){
    const res=await fetch('https://raw.githubusercontent.com/Rajavasanthan/jsondata/master/pagenation.json');
    let respo =await res.json();
    console.log("1-print")
    console.log(respo);
    return respo;
}

fetchData().then(e=>{
    updateValue(e)
});
function updateValue(respos){
datavalue=respos;
}
console.log("2-print")
console.log(datavalue)

function tablePage(page,btn){
    jsp_curren_age=page;

    const btn_pre = document.getElementById("btn-pre")
    const btn_1 = document.getElementById("btn-1")
    const btn_2 = document.getElementById("btn-2")
    const btn_3 = document.getElementById("btn-3")
    const btn_next = document.getElementById("btn-next")
   
    const mytable = document.getElementById("html-data-table");
    mytable.innerHTML = '';

    let tblvalue = {userid:"ID",id:"Name",title:"EMail"};
    let newRow = document.createElement("tr")
    Object.values(tblvalue).forEach((value)=>{
           let cell = document.createElement("th");
           cell.innerText = value;
           newRow.appendChild(cell);
    })
    mytable.appendChild(newRow);

    let start = (page-1)*jsp_records_per_page;
    let subtodos=datavalue.slice(start,start+jsp_records_per_page);

    subtodos.forEach(todo=>{
        let newRow = document.createElement("tr")
        Object.values(todo).forEach((value)=>{
            let cell = document.createElement("td");
            cell.innerText = value;
        newRow.appendChild(cell);
        });
    mytable.appendChild(newRow);
});
///page numbr
let page_span = document.getElementById('page');
if (page < 1){
   page= 1;
}
if (page >jsp_num_pages()) {
    page = jsp_num_pages();
}
page_span.innerHTML = `${page}/${jsp_num_pages()}`;
///////
   btn_pre.style.display = (page ===1) ? 'none' :'inline';
   btn_next.style.display = (page === jsp_num_pages()) ? 'none':'inline';
   if (btn===1){
    if(btn_3.text<page){
        btn_3.text = page;
        btn_2.text = page-1;
        btn_1.text = page-2;

    }
   } else if(btn==-1){
    if(btn_1.text>page){
        btn_1.text = page;
        btn_2.text = page+1;
        btn_3.text = page+2;
   }}
   else {

   }
}

   function jsp_num_pages(){
    return Math.ceil(datavalue.length / jsp_records_per_page)
   }

   function jsp_pre_page(){
      if (jsp_curren_age >1){
        jsp_curren_age--;
        tablePage(jsp_curren_age,-1)

      }
   }

   function jsp_next_page(){
    if(jsp_curren_age < jsp_num_pages()){
        jsp_curren_age++;
        tablePage(jsp_curren_age,1)

    }
   }

   function btn_click(btn){
        if(btn==1){
            const btn_1 = document.getElementById("btn-1")
            tablePage(btn_1.text,0)
        } else if (btn ==2){
            const btn_2 = document.getElementById("btn-2")
            tablePage(btn_2.text,0)
        }  else {
            const btn_3 = document.getElementById("btn-3")
            tablePage(btn_3.text,0)
        }
   }

   window.onload = () => {
    document.getElementById('btn-pre').addEventListener('click',(e)=>{
        e.preventDefault();
        jsp_pre_page();
    });
    document.getElementById('btn-next').addEventListener('click',(e)=>{
        e.preventDefault();
        jsp_next_page();
    });

    document.getElementById('btn-1').addEventListener('click',(e)=>{
        e.preventDefault();
        btn_click(1);
    });
    document.getElementById('btn-2').addEventListener('click',(e)=>{
        e.preventDefault();
        btn_click(2);

    }); 

    document.getElementById('btn-3').addEventListener('click',(e)=>{
        e.preventDefault();
        btn_click(3);
    
   })

   document.getElementById('test').addEventListener('click',(e)=>{
    e.preventDefault();
    tablePage(1,0);
   })
   tablePage(1,0)
}
