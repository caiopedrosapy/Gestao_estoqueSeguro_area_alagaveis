import { Check, Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('estoques')
@Check('estoques_nome_check', "btrim(nome) <> ''")
@Check('estoques_localizacao_check', "btrim(localizacao) <> ''")
@Check('estoques_altura_cm_check', 'altura_cm >= 0')
export class Estoque {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column({ type: 'varchar', length: 120 })
  nome!: string;

  @Column({ type: 'varchar', length: 200 })
  localizacao!: string;

  @Column({ name: 'altura_cm', type: 'integer' })
  alturaCm!: number;

  @Column({ type: 'boolean', default: false })
  seguro!: boolean;
}
