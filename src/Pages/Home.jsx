import { useState } from 'react'

const Home = () => {
    const [inputs,setInputs] =useState({
        name:"",
        email:"",
    })
    const [tableData,setTableData]= useState([]);
    const [update,setUpdate] = useState(false);
    const [editClickdata,setEditClickData] = useState("");
    const handleChange= (e)=>{
        setInputs({
            ...inputs,
            [e.target.name]:e.target.value,
        });
    }
    const handleSubmit = (e)=>{
        e.preventDefault();
        if (!inputs.name.trim() || !inputs.email.trim()) {
            alert("Both name and email fields must be filled out.");
            return;
        }
        const isDuplicate = tableData.some(
            (item) => item.name === inputs.name && item.email === inputs.email
        );
        if (update && editClickdata !== null) {
            const updatedData = tableData.map((item, index) =>
                index === editClickdata ? { ...inputs } : item
            );
            setTableData(updatedData);
            setInputs({ name: '', email: '' });
            setEditClickData(null); 
        }else{
            
            if (!isDuplicate) {
                setTableData([
                    ...tableData,
                    { name: inputs.name, email: inputs.email } 
                ]);
            }
            setInputs({ name: '', email: '' });
        }
       
        
        setUpdate(false);
    }
    const handleDelete=(index)=>{
        const filterData = tableData.filter((item,i)=>i !== index);
        setTableData(filterData);
    }
    const handleEdit = (index) => {
        const editItem = tableData[index];
        setInputs({
            name:editItem.name,
            email:editItem.email
        });
        setUpdate(true);
        setEditClickData(index);
    }
  return (
    <div className='min-h-screen bg-[#004b43]'>
      <h1 className='text-center text-white font-bold text-[30px] py-3'>Tailwind Crud</h1>
      <div className='bg-[#e5e4e4] max-w-fit m-auto p-10'>
        <form onSubmit={handleSubmit}>
            <div className='flex flex-col'>
                <label>Name</label>
                <input className='my-2' name="name" value={inputs.name} onChange={handleChange}/>
            </div>
            <div className='flex flex-col'>
                <label>Email</label>
                <input className='my-2' name="email" value={inputs.email} onChange={handleChange}/>
            </div>
            <button type='submit' className='mt-3 w-full bg-[#014d64] text-white text-center'>
                {
                    update ? "Update" : "Add"
                }
            </button>
        </form>
      </div>
      <div>
        <table className='w-full'>
            <thead>
                <th>
                    name
                </th>
                <th>
                    email
                </th>
                <th>
                    action
                </th>
            </thead>
            <tbody>
                { tableData.map((item,i)=>(
                        <tr key={i}>
                            <td className='text-center'>{item.name}</td>
                            <td className='text-center'>{item.email}</td>
                            <td>
                                <button onClick={()=>handleEdit(i)} className='mr-3 text-yellow-300'>edit</button>
                                <button onClick={()=>handleDelete(i)} className='text-red-300'>delete</button>
                            </td>
                        </tr>
                ))
                }
                
            </tbody>
        </table>
      </div>
    </div>
  )
}

export default Home
