-- CreateTable
CREATE TABLE "registers" (
    "id" TEXT NOT NULL,
    "description" VARCHAR(191) NOT NULL,
    "limit" TIMESTAMP(3) NOT NULL,
    "type" INTEGER NOT NULL,
    "userId" TEXT NOT NULL,
    "equipamentId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "registers_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "registers" ADD CONSTRAINT "registers_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "registers" ADD CONSTRAINT "registers_equipamentId_fkey" FOREIGN KEY ("equipamentId") REFERENCES "equipments"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;
