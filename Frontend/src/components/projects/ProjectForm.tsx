import type { UseFormRegister, FieldErrors } from "react-hook-form"
import ErrorMessage from "../ErrorMessage";
import type { ProjectFormData } from "types";

type ProjectFormProps = {
    register: UseFormRegister<ProjectFormData>
    errors: FieldErrors<ProjectFormData>
}

export default function ProjectForm({register, errors} : ProjectFormProps) {
    return (
        <>
            <div className="mb-5 space-y-3">
                <label htmlFor="projectName"
                    className="text-sm uppercase font-bold"
                    >Nombre del Proyecto
                </label>
                <input type="text"
                    id="projectName" 
                    className="w-full p-3 border border-gray-200"
                    placeholder="Nombre de tu Proyecto"
                    {...register('projectName',{
                        required:'El nombre del proyecto es obligatorio'
                    })}
                />
                {errors.projectName && (
                    <ErrorMessage>{errors.projectName.message}</ErrorMessage>
                )}
            </div>

            <div className="mb-5 space-y-3">
                <label htmlFor="clientName"
                    className="text-sm uppercase font-bold"
                    >Nombre del Cliente
                </label>
                <input type="text"
                    id="projectName" 
                    className="w-full p-3 border border-gray-200"
                    placeholder="Nombre de tu Proyecto"
                    {...register('clientName',{
                        required:'El nombre del ciliente es obligatorio'
                    })}
                />
                {errors.clientName && (
                    <ErrorMessage>{errors.clientName.message}</ErrorMessage>
                )}
            </div>

            <div className="mb-5 space-y-3">
                <label htmlFor="description"
                    className="text-sm uppercase font-bold"
                    >Descripción
                </label>
                <input type="text"
                    id="projectName" 
                    className="w-full p-3 border border-gray-200"
                    placeholder="Nombre de tu Proyecto"
                    {...register('description',{
                        required:'La descripción del proyecto es obligatorio'
                    })}
                />
                {errors.description && (
                    <ErrorMessage>{errors.description.message}</ErrorMessage>
                )}
            </div>
        </>
    )   
}
