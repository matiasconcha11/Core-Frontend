import { X } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"

interface SentimentDetailsPopupProps {
  category: string
  onClose: () => void
}

// Sample data - replace with actual data in a real application
const generateComments = (category: string) => {
  const comments = [
    {
      name: "Juan Pérez",
      plan: "Plan Básico",
      phone: "+56 9 1234 5678",
      comment: "Muy buena relación calidad-precio.",
    },
    { name: "María González", plan: "Plan Pro", phone: "+56 9 8765 4321", comment: "Los entrenadores son excelentes." },
    {
      name: "Carlos Rodríguez",
      plan: "Plan Experto",
      phone: "+56 9 2468 1357",
      comment: "Me encanta el ambiente del gimnasio.",
    },
    {
      name: "Ana Martínez",
      plan: "Plan Básico",
      phone: "+56 9 1357 2468",
      comment: "Podrían mejorar la variedad de clases.",
    },
    {
      name: "Pedro Sánchez",
      plan: "Plan Pro",
      phone: "+56 9 3698 5214",
      comment: "Las máquinas están en buen estado.",
    },
  ]

  return comments.map((comment) => ({
    ...comment,
    comment: `${category}: ${comment.comment}`,
  }))
}

export function SentimentDetailsPopup({ category, onClose }: SentimentDetailsPopupProps) {
  const comments = generateComments(category)

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <Card className="w-full max-w-4xl max-h-[80vh] flex flex-col">
        <CardHeader className="flex flex-row items-center justify-between">
          <CardTitle>Comentarios - {category}</CardTitle>
          <Button variant="ghost" size="icon" onClick={onClose}>
            <X className="h-4 w-4" />
          </Button>
        </CardHeader>
        <CardContent className="flex-grow overflow-hidden">
          <ScrollArea className="h-[calc(80vh-100px)]">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Nombre</TableHead>
                  <TableHead>Plan</TableHead>
                  <TableHead>Teléfono</TableHead>
                  <TableHead>Comentario</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {comments.map((comment, index) => (
                  <TableRow key={index}>
                    <TableCell>{comment.name}</TableCell>
                    <TableCell>{comment.plan}</TableCell>
                    <TableCell>{comment.phone}</TableCell>
                    <TableCell>{comment.comment}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </ScrollArea>
        </CardContent>
      </Card>
    </div>
  )
}

