import { Component, OnInit, Inject } from '@angular/core';
import { HttpClient} from '@angular/common/http';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material';
import { Cenario, TipoRegra, RegraCritica, UnidadeGeradora, Usina } from '../../model/model';
import { environment } from '../../../environments/environment';

const ClassificacaoOrigem = {
    
  // responsabilidade
  GUM : "GUM",    // turbina e equipamentos associados à produção de potência mecânica
  GGE : "GGE",    // gerador e equipamentos associados à produção de potência elétrica
  GTR : "GTR",    // transformador elevador de tensão e equipamentos associados 
  GOT : "GOT",    // equipamentos ou sistemas eletromecânicos associados aos serviços auxiliares
  GAC : "GAC",    // restrição elétrica imposta por ativos de conexão de uso exclusivo do empreendimento de geração
  GAG : "GAG",    // origens não caracterizadas por equipamentos ou sistemas eletromecânicos
  GCB : "GCB",    // restrições em unidades geradoras termelétricas associadas ao fornecimento do combustível

  // não responsabilidade sem taxas
  GCI : "GCI",    // restrições em unidades geradoras termelétricas associadas ao fornecimento do combustível
  GIS : "GIS",    // instalação de sistemas por determinação do ons
  GIC : "GIC",    // indisponibilidades associadas ao início de operação comercial de unidade geradora
  GIM : "GIM",    // indisponibilidades associadas à modernização ou reforma que traga ganhos operativos ao sistema elétrico
  GVO : "GVO",    // indisponibilidades atípicas associadas ao início de operação comercial de unidade geradora
  GMP : "GMP",    // indisponibilidades associadas a medidas de caráter preventivo de combate à proliferação
  GMT : "GMT",    // indisponibilidades associadas às intervenções de limpeza 

  // não responsabilidade
  GHN : "GHN",    // restrição devido à navegação que não caracterize responsabilidade do agente
  GHT : "GHT",    // restrição devido ao turismo que não caracterize responsabilidade do agente
  GHI : "GHI",    // restrição devido à irrigação ou outras captações que não caracterize responsabilidade do agente
  GHC : "GHC",    // restrição devido ao controle de cheia e a inundações que não caracterize responsabilidade do agente
  GRE : "GRE",    // restrição de potência por redução de queda útil
  GRB : "GRB",    // restrição elétrica imposta pela rede básica
  GOU : "GOU",    // restrição elétrica imposta por outros sistemas de transmissão ou pelo sistema de distribuição
  GOO : "GOO",    // restrição por outras origens que não caracterize responsabilidade do empreendimento de geração
  GHM : "GHM"     // restrição devido ao meio ambiente
}

@Component({
  selector: 'app-dialog-cenario',
  templateUrl: './dialog-cenario.component.html',
  styleUrls: ['./dialog-cenario.component.css']
})
export class DialogCenarioComponent implements OnInit {

  tiposRegras: TipoRegra[] = [TipoRegra.PotenciaDisponivel, TipoRegra.Franquia, TipoRegra.OrigemEvento];

  uges: UnidadeGeradora[] = [];

  usinas: Usina[] = [];

  origens: string[] = [
    ClassificacaoOrigem.GUM,ClassificacaoOrigem.GGE, ClassificacaoOrigem.GTR, ClassificacaoOrigem.GOT, 
      ClassificacaoOrigem.GAC, ClassificacaoOrigem.GAG, ClassificacaoOrigem.GCB, 
    ClassificacaoOrigem.GCI, ClassificacaoOrigem.GIS, ClassificacaoOrigem.GIC, ClassificacaoOrigem.GIM, 
      ClassificacaoOrigem.GVO, ClassificacaoOrigem.GMP, ClassificacaoOrigem.GMT,
    ClassificacaoOrigem.GHN, ClassificacaoOrigem.GHT, ClassificacaoOrigem.GHI, ClassificacaoOrigem.GHC, 
      ClassificacaoOrigem.GRE, ClassificacaoOrigem.GRB, ClassificacaoOrigem.GOU, ClassificacaoOrigem.GOO, ClassificacaoOrigem.GHM
  ];

  get idUsina() {
    return this.data.idUsina;
  }

  set idUsina(value) {
    this.data.idUsina = value;
    this.listarUges();
  }

  constructor(private dialogRef: MatDialogRef<DialogCenarioComponent>,
    @Inject(MAT_DIALOG_DATA) private data: Cenario, private http: HttpClient) { }

  ngOnInit() {
    this.listarUsinas();
    this.listarUges();
  }

  getUge(idUge) {
    var retorno = {};
    this.uges.forEach(it => {
      if (it.idUge == idUge) {
        retorno = it;
      }
    });
    return retorno;
  }

  get titulo() {
    return this.data.idCenario ? "Alterar" : "Incluir";
  }

  listarUsinas() {
    this.http.get(environment.urlServerPresentation + environment.listarUsinas).subscribe(data => {
      this.usinas = <Usina[]>data;
    });
  }

  listarUges() {
    
    if (this.data && this.data.idUsina) {

      var url = environment.urlServerPresentation + environment.listarUnidadesGeradoras +
       '?idUsina=' + this.data.idUsina;
      
      this.http.get(url).subscribe(data => {
        this.uges = <UnidadeGeradora[]>data;
      });
    } else {
      this.uges = [];
    }

  }

  confirmar(): void {

    if (this.data.nomeCenario && this.data.dataInicioVigencia && this.data.justificativa) {

      if (this.validarRegras()) {
        this.dialogRef.close(this.data);
      } 

    } else {
      alert('Informe os campos: Nome do Cenário, Data Inicial, Data Final e Justificativa!');
    }

  }

  validarRegras() {
    
    var retorno = true;
    
    if (this.data.regras && this.data.regras.length > 0) {
      this.data.regras.forEach(it => {
        if (!it.nomeRegra || !it.tipoRegra || !it.regraDe || !it.regraPara) {
          alert('Informe os dados da regra!');
          retorno = false;
        }
      });
    } else {
      alert('Informe pelo menos uma regra crítica para ser aplicada ao cenário!');
      retorno = false;
    }

    return retorno;
  }

  excluirRegra(regra) {
    var index = this.data.regras.indexOf(regra);
    this.data.regras.splice(index,1);
  }

  incluirRegra() {

    var regra = new RegraCritica()
    regra.idCenario = this.data.idCenario;
    this.data.regras.push(regra);
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

}
