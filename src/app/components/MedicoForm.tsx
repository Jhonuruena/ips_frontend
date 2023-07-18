import { useEffect, useState } from "react";


interface Especialidad{
    especialidad:string;
    codigo:string
    _links: Record<string,{href:string}>
}

interface Medico{
    nombre:string;
    apellido:string;
    consultorio:string;
    correo:string;
    especialidad:string;
}


const MedicoForm = ()=>{

    const [especialidades, setEspecialidades] = useState<Especialidad[]>([])
    const [submitted, setSubmitted]= useState(false)

    const handleSubmit = async (e:any)=>{
        e.preventDefault()

        const miMedico:Medico={
            nombre:e.target.nombre.value,
            apellido:e.target.apellido.value,
            consultorio:e.target.consultorio.value,
            correo:e.target.correo.value,
            especialidad:e.target.especialidad.value,
        }
        console.log(miMedico)

        try {
            const response= await fetch('http://localhost:8080/medicos', {
                method:"POST",
                headers:{
                    "Content-type": "application/json"
                },
                body: JSON.stringify(miMedico)
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
        const fetchEspecialidades = async()=>{
            try {
                const response= await fetch("http://localhost:8080/especialidades")
                const data = await response.json()
                setEspecialidades(data._embedded.especialidades)
            } catch (error) {
                console.error(error)                
            }
        }
        fetchEspecialidades()
    },[])

    return(
        <div>
        <form onSubmit={handleSubmit}>
            <input type="text" name="nombre" placeholder="Nombre"></input>
            <input type="text" name="apellido" placeholder="Apellido"></input>
            <input type="text" name="consultorio" placeholder="Consultorio"></input>
            <input type="text" name="correo" placeholder="Correo"></input>

            <select name="especialidad">
                <option key="" value="">Seleccione una Especialidad</option>
                {
                    especialidades.map((especialidad)=>(
                            <option key={especialidad.codigo} value={especialidad._links.especialidad.href}>
                                {especialidad.especialidad}
                            </option>
                    )
                    )
                }
            </select>
            <button type="submit">Guardar</button>
        
        </form>
        </div>
        
    )
}

export default MedicoForm
