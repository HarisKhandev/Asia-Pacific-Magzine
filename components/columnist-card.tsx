import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"

interface ColumnistCardProps {
  name: string
  expertise: string
  image: string
  description: string
}

export function ColumnistCard({ name, expertise, image, description }: ColumnistCardProps) {
  return (
    <Card className="overflow-hidden hover:shadow-lg transition-shadow">
      <div className="aspect-square relative overflow-hidden">
        <img
          src={image || "/placeholder.svg"}
          alt={name}
          className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
        />
      </div>
      <CardContent className="p-6">
        <h3 className="text-xl font-bold mb-2 text-balance">{name}</h3>
        <p className="text-emerald-600 font-semibold mb-3">{expertise}</p>
        <p className="text-slate-600 leading-relaxed mb-4">{description}</p>
        <Button variant="outline" className="w-full bg-transparent">
          Work as Assistant
        </Button>
      </CardContent>
    </Card>
  )
}
