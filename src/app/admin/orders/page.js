
import Table from '@/components/Table'
const page = () => {
  return (
    <div className=' container mx-auto'>
        <Table dbName={'users'} thheadF={ [
    { id: "id" },
    { fullname: "שם מלא" },
    { email: "אימייל" },
    { phone: "טלפון" },
    { address: "כתובת" },
    { dealer: "גבי" },
  ]}/>
  
    </div>
  )
}

export default page


// [
//     { id: "id" },
//     { fullname: "שם מלא" },
//     { email: "אימייל" },
//     { phone: "טלפון" },
//     { address: "כתובת" },
//     { dealer: "דילר" },
//   ]