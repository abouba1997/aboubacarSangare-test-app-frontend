import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import Link from "next/link";
import { BookOpen, GraduationCap, Users } from "lucide-react";

export default function Home() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Tableau de bord</h1>
        <p className="text-muted-foreground">
          Bienvenue dans l&apos;interface d&apos;administration académique
        </p>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Programmes</CardTitle>
            <BookOpen className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">Gestion des programmes</div>
            <p className="text-xs text-muted-foreground">
              Créer, modifier et supprimer des programmes académiques
            </p>
            <Button asChild className="mt-4 w-full">
              <Link href="/programs">Accéder</Link>
            </Button>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Niveaux</CardTitle>
            <GraduationCap className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">Gestion des niveaux</div>
            <p className="text-xs text-muted-foreground">
              Gérer les niveaux et leurs programmes associés
            </p>
            <Button asChild className="mt-4 w-full">
              <Link href="/levels">Accéder</Link>
            </Button>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Étudiants</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">Liste des étudiants</div>
            <p className="text-xs text-muted-foreground">
              Consulter et filtrer la liste des étudiants
            </p>
            <Button asChild className="mt-4 w-full">
              <Link href="/students">Accéder</Link>
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
