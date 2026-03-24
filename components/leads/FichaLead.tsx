import { Lead } from "types/lead"

export function FichaLead({ lead }: { lead: Lead }) {
  const ficha = lead.ficha

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold">{lead.nome}</h1>
        <p className="text-muted-foreground">
          {lead.telefone} • {lead.email}
        </p>
      </div>

      <div className="grid grid-cols-3 gap-4">
        <Card title="Tipo de Plano" value={ficha.tipoPlano} />
        <Card title="Vidas" value={ficha.quantidadeVidas} />
        <Card title="Localidade" value={ficha.localidade} />
      </div>

      <div className="bg-card border rounded-2xl p-4">
        <h2 className="font-semibold mb-2">Idades</h2>
        <p>{ficha.idades.join(", ")}</p>
      </div>

      <div className="bg-card border rounded-2xl p-4">
        <h2 className="font-semibold mb-2">Hospitais</h2>
        <ul className="list-disc ml-5">
          {ficha.hospitaisPreferidos.map((h, i) => (
            <li key={i}>{h}</li>
          ))}
        </ul>
      </div>

      <div className="bg-card border rounded-2xl p-4">
        <h2 className="font-semibold mb-4">Cotações</h2>

        <div className="space-y-3">
          {ficha.cotacoes.map((c) => (
            <div
              key={c.id}
              className="border rounded-xl p-3 flex justify-between items-center"
            >
              <div>
                <p className="font-medium">{c.titulo}</p>
                <p className="text-xs text-muted-foreground">
                  {c.createdAt}
                </p>
              </div>

              <div className="text-right">
                <p className="font-bold text-blue-600">
                  R$ {c.valor}
                </p>
                <a
                  href={c.link}
                  target="_blank"
                  className="text-xs text-blue-600 hover:underline"
                >
                  Ver cotação
                </a>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-3 gap-4">
        <Card
          title="Primeiro Contato"
          value={
            ficha.primeiroContato
              ? `${ficha.primeiroContato.data} (${ficha.primeiroContato.diaSemana})`
              : "-"
          }
        />
        <Card
          title="Último Contato"
          value={
            ficha.ultimoContato
              ? `${ficha.ultimoContato.data} (${ficha.ultimoContato.diaSemana})`
              : "-"
          }
        />
        <Card
          title="Próximo Contato"
          value={
            ficha.proximoContato
              ? `${ficha.proximoContato.data} (${ficha.proximoContato.diaSemana})`
              : "-"
          }
        />
      </div>

      {ficha.observacoes && (
        <div className="bg-card border rounded-2xl p-4">
          <h2 className="font-semibold mb-2">Observações</h2>
          <p className="text-sm">{ficha.observacoes}</p>
        </div>
      )}
    </div>
  )
}

function Card({ title, value }: { title: string; value: any }) {
  return (
    <div className="bg-card border rounded-2xl p-4">
      <p className="text-xs text-muted-foreground">{title}</p>
      <p className="font-semibold">{value}</p>
    </div>
  )
}