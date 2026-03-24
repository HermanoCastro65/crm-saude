-- CreateTable
CREATE TABLE "Lead" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "nome" TEXT NOT NULL,
    "telefone" TEXT NOT NULL,
    "email" TEXT,
    "origem" TEXT NOT NULL,
    "status" TEXT NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL
);

-- CreateTable
CREATE TABLE "FichaLead" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "leadId" TEXT NOT NULL,
    "idades" JSONB NOT NULL,
    "quantidadeVidas" INTEGER NOT NULL,
    "tipoPlano" TEXT NOT NULL,
    "localidade" TEXT NOT NULL,
    "hospitais" JSONB NOT NULL,
    "planoAtual" JSONB,
    "primeiroContato" JSONB,
    "ultimoContato" JSONB,
    "proximoContato" JSONB,
    "observacoes" TEXT,
    CONSTRAINT "FichaLead_leadId_fkey" FOREIGN KEY ("leadId") REFERENCES "Lead" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "Cotacao" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "fichaId" TEXT NOT NULL,
    "titulo" TEXT NOT NULL,
    "link" TEXT NOT NULL,
    "valor" REAL NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT "Cotacao_fichaId_fkey" FOREIGN KEY ("fichaId") REFERENCES "FichaLead" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);

-- CreateIndex
CREATE UNIQUE INDEX "FichaLead_leadId_key" ON "FichaLead"("leadId");
