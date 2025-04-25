"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { type Level, type Program, levelsApi, programsApi } from "@/lib/api";
import { LevelsTable } from "./levels-table";
import { LevelDialog } from "./level-dialog";
import { Plus } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

export default function LevelsPage() {
  const [levels, setLevels] = useState<Level[]>([]);
  const [programs, setPrograms] = useState<Program[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [currentLevel, setCurrentLevel] = useState<Level | null>(null);
  const { toast } = useToast();

  useEffect(() => {
    const fetchData = async () => {
      try {
        setIsLoading(true);
        const [levelsRes, programsRes] = await Promise.all([
          levelsApi.getAll(),
          programsApi.getAll(),
        ]);
        setLevels(levelsRes.data);
        setPrograms(programsRes.data);
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

  const handleCreateLevel = () => {
    setCurrentLevel(null);
    setDialogOpen(true);
  };

  const handleEditLevel = (level: Level) => {
    setCurrentLevel(level);
    setDialogOpen(true);
  };

  const handleDeleteLevel = async (id: string) => {
    try {
      await levelsApi.delete(id);
      setLevels(levels.filter((level) => level.id !== id));
      toast({
        title: "Succès",
        description: "Niveau supprimé avec succès",
      });
    } catch (error) {
      console.log(error);

      toast({
        title: "Erreur",
        description: "Impossible de supprimer le niveau",
        variant: "destructive",
      });
    }
  };

  const handleSaveLevel = async (data: Partial<Level>) => {
    try {
      if (currentLevel) {
        // Mise à jour
        const response = await levelsApi.update(currentLevel.id, data);
        setLevels(
          levels.map((l) => (l.id === currentLevel.id ? response.data : l))
        );
        toast({
          title: "Succès",
          description: "Niveau mis à jour avec succès",
        });
      } else {
        // Création
        const response = await levelsApi.create(data);
        setLevels([...levels, response.data]);
        toast({
          title: "Succès",
          description: "Niveau créé avec succès",
        });
      }
      setDialogOpen(false);
    } catch (error) {
      console.error(error);
      toast({
        title: "Erreur",
        description: "Impossible de sauvegarder le niveau",
        variant: "destructive",
      });
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold tracking-tight">
          Gestion des Niveaux
        </h1>
        <Button onClick={handleCreateLevel}>
          <Plus className="mr-2 h-4 w-4" />
          Nouveau Niveau
        </Button>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Liste des niveaux</CardTitle>
        </CardHeader>
        <CardContent>
          <LevelsTable
            levels={levels}
            isLoading={isLoading}
            onEdit={handleEditLevel}
            onDelete={handleDeleteLevel}
          />
        </CardContent>
      </Card>

      <LevelDialog
        open={dialogOpen}
        onOpenChange={setDialogOpen}
        level={currentLevel}
        programs={programs}
        onSave={handleSaveLevel}
      />
    </div>
  );
}
