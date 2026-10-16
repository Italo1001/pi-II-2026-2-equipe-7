INSERT INTO area_direito (nome) VALUES
('Direito Civil'),
('Direito Penal'),
('Direito Trabalhista'),
('Direito Constitucional'),
('Direito Administrativo'),
('Direito Tributário'),
('Direito Empresarial'),
('Direito do Consumidor'),
('Direito Ambiental'),
('Direito Previdenciário');

INSERT INTO categoria (nome) VALUES
('Contratos'),
('Crimes'),
('Direitos Fundamentais'),
('Relações de Trabalho'),
('Tributos'),
('Empresas'),
('Consumidor'),
('Meio Ambiente'),
('Previdência'),
('Responsabilidade Civil');

INSERT INTO termo (
    nome,
    definicao_tecnica,
    explicacaoClara,
    area_direito_id,
    categoria_id,
    fonte
) VALUES
(
    'Dano Moral',
    'Lesão a direitos da personalidade que pode gerar obrigação de indenizar.',
    'É um prejuízo causado a aspectos como honra, imagem ou dignidade de uma pessoa.',
    1,
    10,
    'Código Civil'
),
(
    'Legítima Defesa',
    'Excludente de ilicitude caracterizada pelo uso moderado dos meios necessários para repelir injusta agressão.',
    'É a possibilidade de se defender de uma agressão injusta usando os meios necessários e de forma moderada.',
    2,
    2,
    'Código Penal'
),
(
    'Aviso Prévio',
    'Comunicação antecipada da rescisão do contrato de trabalho, observados os requisitos legais.',
    'É o período de aviso dado antes do encerramento de um contrato de trabalho.',
    3,
    4,
    'CLT'
),
(
    'Mandado de Segurança',
    'Remédio constitucional destinado à proteção de direito líquido e certo não amparado por habeas corpus ou habeas data.',
    'É uma ação utilizada para proteger determinado direito quando uma autoridade pratica ou ameaça praticar um ato ilegal.',
    4,
    3,
    'Constituição Federal'
),
(
    'Servidor Público',
    'Pessoa legalmente investida em cargo ou função pública, conforme as normas aplicáveis.',
    'É a pessoa que exerce uma função ou ocupa um cargo dentro da Administração Pública.',
    5,
    6,
    'Legislação Administrativa'
),
(
    'ICMS',
    'Imposto de competência dos Estados e do Distrito Federal incidente sobre determinadas operações e prestações.',
    'É um imposto estadual aplicado, entre outras situações, sobre determinadas operações com mercadorias e serviços.',
    6,
    5,
    'Legislação Tributária'
),
(
    'Falência',
    'Processo judicial destinado à liquidação do patrimônio de empresário ou sociedade empresária em situação de insolvência.',
    'É um processo utilizado quando uma empresa não consegue cumprir suas obrigações e precisa ter seu patrimônio organizado e liquidado conforme a lei.',
    7,
    6,
    'Lei de Falências'
),
(
    'Propaganda Enganosa',
    'Publicidade inteira ou parcialmente falsa ou capaz de induzir o consumidor a erro sobre características de produto ou serviço.',
    'É uma publicidade que apresenta informações falsas ou que pode levar o consumidor a entender algo diferente da realidade.',
    8,
    7,
    'Código de Defesa do Consumidor'
),
(
    'Área de Preservação Permanente',
    'Área protegida, coberta ou não por vegetação nativa, destinada a preservar recursos ambientais e funções ecológicas.',
    'É uma área que recebe proteção especial para conservar recursos naturais e ambientais.',
    9,
    8,
    'Código Florestal'
),
(
    'Pensão por Morte',
    'Benefício previdenciário devido aos dependentes do segurado em razão de seu falecimento, observados os requisitos legais.',
    'É um benefício que pode ser pago aos dependentes de uma pessoa segurada que faleceu.',
    10,
    9,
    'Legislação Previdenciária'
);


INSERT INTO exemplo (texto, termo_id) VALUES
(
    'Uma pessoa pode buscar indenização quando sofre um dano moral comprovado em determinadas situações.',
    1
),
(
    'Uma pessoa que reage moderadamente para se proteger de uma agressão injusta pode alegar legítima defesa.',
    2
),
(
    'Quando o empregador encerra o contrato sem justa causa, pode existir a obrigação de conceder aviso prévio.',
    3
),
(
    'Uma pessoa pode utilizar o mandado de segurança para proteger um direito líquido e certo diante de ato ilegal de autoridade.',
    4
),
(
    'Um servidor público pode exercer suas funções em um órgão da Administração Pública conforme as regras do cargo.',
    5
),
(
    'Uma operação comercial que se enquadre nas hipóteses previstas em lei pode estar sujeita à cobrança de ICMS.',
    6
),
(
    'Uma empresa que não consegue cumprir suas obrigações pode ser submetida a um processo de falência.',
    7
),
(
    'Um consumidor que compra um produto fora do estabelecimento comercial pode, em determinadas situações, desistir da compra dentro do prazo legal.',
    8
),
(
    'Uma área classificada como Área de Preservação Permanente recebe proteção legal para conservar recursos ambientais, como margens de rios e encostas.',
    9
),
(
    'Um segurado que cumpre os requisitos previstos na legislação pode ter direito à aposentadoria.',
    10
);


-- Senha de desenvolvimento dos administradores: senha123 (hash BCrypt).
INSERT INTO administrador (nome, email, senha) VALUES
('Pedro Maciel', 'pedro.maciel@jurisfacil.com', '$2a$10$LhXN5b76QQqQKaoIzIn/duwf0Xo5PycfRcEkKxRQW5YWGRLv0vZd2'),
('Italo Costa', 'italo.costa@jurisfacil.com', '$2a$10$9r0DpzwacfvUubUzkKd8POORjO2KAgA4Ebqiv.9/meo7Lgzt2DNA.'),
('Vinicius Azevedo', 'vinicius.azevedo@jurisfacil.com', '$2a$10$2FlZusjt.S8J9bHWa4pRrumQdymYGWEjghG13utcqc6CWtsYcgBCC'),
('Felipe Gabriel', 'felipe.gabriel@jurisfacil.com', '$2a$10$r9G/zSPUj1.oYX/x.nnkxOEcrfBEpJhmHug3.18bE9mgsEP4L2Gb.'),
('Juan Alves', 'juan.alves@jurisfacil.com', '$2a$10$ycSxm0jWqVyZa8CqNEotr.SrGAM6.6dTTLpBHrEjUc4P1RFReuTgS'),
('Rykelme Gonçalves', 'rykelme.goncalves@jurisfacil.com', '$2a$10$sxGCunbzyd2ieluqRXv34uW8hRK3XG6XpHSi7SXQ47bND.B6LmKX2'),
('Caliel Ximenes', 'caliel.ximenes@jurisfacil.com', '$2a$10$uRqPkrmUOiavZkcTgzpbguI7b86EopGpRh1pJQCIipPSUL.YGgW/q'),
('Luiz Felipe', 'luiz.felipe@jurisfacil.com', '$2a$10$YCcmi7QfwCNbBTiWKrtmke980nlcfSB94rs2xvWwOGhjBL/ZSFgOS'),
('Larissa', 'larissa@jurisfacil.com', '$2a$10$sM0gDKT8g3VqFHpN.ZvTz.9TghoU1j9qqM9Vgqz0qm..O1tgjJ3Ty'),
('Administrador Teste', 'teste@jurisfacil.com', '$2a$10$IjMP22yXDMLXzoyjxoZ69OLIUHIE8eitdQNWz64OtUomCb1ZYkyp2');