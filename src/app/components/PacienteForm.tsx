import { useEffect, useState } from "react";



interface Paciente{
    nombre:string;
    cedula:string;
    apellido:string;
    edad:string;
    telefono:string;
}


const PacienteForm = ()=>{

    const [submitted, setSubmitted]= useState(false)

    const handleSubmit = async (e:any)=>{
        e.preventDefault()

        const miPaciente:Paciente={
            nombre:e.target.nombre.value,
            cedula:e.target.cedula.value,
            apellido:e.target.apellido.value,
            edad:e.target.edad.value,
            telefono:e.target.telefono.value,
        }
        console.log(miPaciente)

        try {
            const response= await fetch('http://localhost:8080/pacientes', {
                method:"POST",
                headers:{
                    "Content-type": "application/json"
                },
                body: JSON.stringify(miPaciente)
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

    return(
        <div>
        <form onSubmit={handleSubmit}>
            <input type="text" name="cedula" placeholder="Cedula"></input>
            <input type="text" name="nombre" placeholder="Nombre"></input>
            <input type="text" name="apellido" placeholder="Apellido"></input>
            <input type="text" name="edad" placeholder="Edad"></input>
            <input type="text" name="telefono" placeholder="Telefono"></input>

       
            <button type="submit">Guardar</button>
        
        </form>
        </div>
        
    )
}

export default PacienteForm