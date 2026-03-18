import { overviewPages } from "./components/overview-pages";
export default function Dashboard() {
  return (
    <div className="">
       {overviewPages 
       .filter(page=>page.roles.includes('TEACHER'))
       .map(({id,components:Page})=>{
        return <Page key={id}/>
       })
       }
    </div>
  );
}   