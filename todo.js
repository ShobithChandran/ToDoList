let currentUser
try {
    currentUser=JSON.parse(window.localStorage.getItem('user'));
} catch {
    window.location = 'index.html'
}

// setting welcome text
$('#welcome').html(`Welcome ${currentUser.uname} to your ToDoList`);

// AJAX call to fetch data using axios library.
const getList=async ()=>{
    try{
        const res=await axios.get('https://jsonplaceholder.typicode.com/todos');
        const lists=res.data;
        let listcontent='<tbody>';
        lists.forEach((el) => {
            listcontent += `
                <tr>
                    <td>${el.userId}</td>
                    <td>${el.id}</td>
                    <td>${el.title}</td>
                    <td>${el.completed ? '<input type="checkbox" class="disabled" checked disabled>' : '<input type="checkbox" class="checkbox">'}</td>
                </tr>
            `
        });
        listcontent += '</tbody>'
        $('#todoList').append(listcontent);
        if(checkedCount){
            checkedCount=0;
        }

    }
    catch(e){
        console.log('failed to fetch lists data',e);
    }
}
// call getlist() when GET LIST is clicked.
$('#getList').on('click',(e)=>{
    e.preventDefault();
    getList();
});

//variable to keep track of cheking list items
let checkedCount=0;

const alertPromise= ()=>{
     return new Promise((resolve,reject)=>{

         
        if(checkedCount===5){
            resolve(checkedCount)
        }
        else{
            reject('count not equal to 5');
        }
    });
}

const promiseCall=()=>{
    alertPromise().then((data)=>{
        alert(`Congrats. ${data} Tasks have been Successfully Completed`);
    })
    .catch((err)=>{
        console.log('promise rejected');
    })
}


getList();

$('#todoList').on('change','.checkbox',function(e){
    if($(this).prop('checked')==true){
        console.log('checked');
        checkedCount++; 
        $(this).parent().addClass('active');
    }
    else{
        checkedCount--;
        console.log('unchecked');
        $(this).parent().removeClass('active');
    }   
    promiseCall();
});