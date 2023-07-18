import { useEffect, useState } from "react";



interface Paciente{
    id:number;
    nombre:string;
    cedula:number;
    apellido:string;
    edad:Number;
    telefono: string;
    _links: Record<string, {href:string}>
}

interface Medico{
    id:number;
    nombre:string;
    apellido:string;
    consultorio:string;
    correo:string;
    especialidad:string;
    _links: Record<string, {href:string}>
}

interface Cita{
    paciente:string;
    medico: string;
    date: string 
}

const CitaForm =()=>{

    const [medicos, setMedicos] = useState<Medico[]>([])
    const [pacientes, setPacientes] = useState<Paciente[]>([])
    const [submitted, setSubmitted]= useState(false)

   
    const handleSubmit = async (e:any)=>{
        e.preventDefault()

        const miCita:Cita={
            paciente:e.target.paciente.value,
            medico:e.target.medico.value,
            date:e.target.date.value,
        }
        console.log(miCita)

        try {
            const response= await fetch('http://localhost:8080/citas', {
                method:"POST",
                headers:{
                    "Content-type": "application/json"
                },
                body: JSON.stringify(miCita)
            })

            const data= await response.json()
            console.log(data)

            e.target.reset()

            setSubmitted(true)
            setTimeout(()=>(setSubmitted(false), 10000))

        } catch (error) {
            console.error(error)
        }

    }




    useEffect(()=>{
        const fetchMedicos = async()=>{
            try {
                const response= await fetch("http://localhost:8080/medicos")
                const data = await response.json()
                setMedicos(data._embedded.medicos)
            } catch (error) {
                console.error(error)                
            }
        }
        fetchMedicos()
    },[])

    
    useEffect(()=>{
        const fetchPacientes = async()=>{
            try {
                const response= await fetch("http://localhost:8080/pacientes")
                const data = await response.json()
                setPacientes(data._embedded.pacientes)
            } catch (error) {
                console.error(error)                
            }
        }
        fetchPacientes()
    },[])

    
    return(
        <div>
        <form  onSubmit={handleSubmit} >
   
            
            <select name="medico">
                <option key="" value="">Seleccione un Medico</option>
                {
                    medicos.map((medico)=>(
                            <option key={medico._links.medico.href} value={medico._links.medico.href}>
                                {medico.nombre + medico.apellido}
                            </option>
                    )
                    )
                }
            </select>
            <select name="paciente">
                <option key="" value="">Seleccione una Paciente</option>
                {
                    pacientes.map((paciente)=>(
                            <option key={paciente._links.paciente.href} value={paciente._links.paciente.href}>
                                {paciente.nombre + paciente.apellido}
                            </option>
                    )
                    )
                }
            </select>
            <input type="date" name="date" placeholder="Fecha"></input>
            <button type="submit">Guardar</button>
        
        </form>
        </div>
        
    )
}

export default CitaForm