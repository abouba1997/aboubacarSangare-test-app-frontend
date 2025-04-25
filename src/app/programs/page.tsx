"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  type Program,
  type ProgramType,
  programsApi,
  programTypesApi,
} from "@/lib/api";
import { ProgramsTable } from "./programs-table";
import { ProgramDialog } from "./program-dialog";
import { Plus } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

export default function ProgramsPage() {
  const [programs, setPrograms] = useState<Program[]>([]);
  const [programTypes, setProgramTypes] = useState<ProgramType[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [currentProgram, setCurrentProgram] = useState<Program | null>(null);
  const { toast } = useToast();

  useEffect(() => {
    const fetchData = async () => {
      try {
        setIsLoading(true);
        const [programsRes, typesRes] = await Promise.all([
          programsApi.getAll(),
          programTypesApi.getAll(),
        ]);
        setPrograms(programsRes.data);
        setProgramTypes(typesRes.data);
      } catch (error) {
        toast({
          title: "Erreur",
          description: "Impossible de charger les données",
          variant: "destructive",
        });
        console.error(error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, [toast]);

  const handleCreateProgram = () => {
    setCurrentProgram(null);
    setDialogOpen(true);
  };

  const handleEditProgram = (program: Program) => {
    setCurrentProgram(program);
    setDialogOpen(true);
  };

  const handleDeleteProgram = async (id: string) => {
    try {
      await programsApi.delete(id);
      setPrograms(programs.filter((program) => program.id !== id));
      toast({
        title: "Succès",
        description: "Programme supprimé avec succès",
      });
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
    } catch (error) {
      toast({
        title: "Erreur",
        description: "Impossible de supprimer le programme",
        variant: "destructive",
      });
    }
  };

  const handleSaveProgram = async (data: Partial<Program>) => {
    try {
      if (currentProgram) {
        // Mise à jour
        const response = await programsApi.update(currentProgram.id, data);
        setPrograms(
          programs.map((p) => (p.id === currentProgram.id ? response.data : p))
        );
        toast({
          title: "Succès",
          description: "Programme mis à jour avec succès",
        });
      } else {
        // Création
        const response = await programsApi.create(data);
        setPrograms([...programs, response.data]);
        toast({
          title: "Succès",
          description: "Programme créé avec succès",
        });
      }
      setDialogOpen(false);
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
    } catch (error) {
      toast({
        title: "Erreur",
        description: "Impossible de sauvegarder le programme",
        variant: "destructive",
      });
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold tracking-tight">
          Gestion des Programmes
        </h1>
        <Button onClick={handleCreateProgram}>
          <Plus className="mr-2 h-4 w-4" />
          Nouveau Programme
        </Button>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Liste des programmes</CardTitle>
        </CardHeader>
        <CardContent>
          <ProgramsTable
            programs={programs}
            isLoading={isLoading}
            onEdit={handleEditProgram}
            onDelete={handleDeleteProgram}
          />
        </CardContent>
      </Card>

      <ProgramDialog
        open={dialogOpen}
        onOpenChange={setDialogOpen}
        program={currentProgram}
        programTypes={programTypes}
        onSave={handleSaveProgram}
      />
    </div>
  );
}
