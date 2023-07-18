"use client"
import PacienteForm from "@/app/components/PacienteForm"


export default function AddPacientePage(){

    return(
        <div className="container">
            <h1>Crear Paciente</h1>
            <PacienteForm></PacienteForm>
        </div>
    )
}