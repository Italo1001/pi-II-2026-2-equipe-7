const illustrations = [
    [
      'Direito Civil',
      'Relações, contratos e responsabilidades.',
      'https://media.base44.com/images/public/6a9dbf9701f9692e2db31f20/449398090_generated_f2e65bf3.jpg',
    ],
    [
      'Direito Penal',
      'Crimes, penas e garantias.',
      'https://media.base44.com/images/public/6a9dbf9701f9692e2db31f20/d0f60e0b8_generated_1209573d.jpg',
    ],
    [
      'Direito Trabalhista',
      'Trabalho, vínculos e proteção.',
      'https://media.base44.com/images/public/6a9dbf9701f9692e2db31f20/e48fb3c48_generated_da4688c6.jpg',
    ],
    [
      'Direito do Consumidor',
      'Consumo, equilíbrio e reparação.',
      'https://media.base44.com/images/public/6a9dbf9701f9692e2db31f20/4a356fe46_generated_813925c1.jpg',
    ],
  ];
  
  export default function CategoryLibrary({ terms, onSelect }) {
    const categories = [...new Set(terms.map(term => term.category))].sort().map(name => {
      const illustration = illustrations.find(item => item[0] === name);
      return [name, illustration?.[1] ?? 'Consulte os termos desta área.', illustration?.[2] ?? illustrations[0][2]];
    });
    return (
      <section
        id="areas"
        className="bg-[#1A1C1E] py-28 text-[#F9F8F6] lg:py-40"
      >
        <div className="mx-auto max-w-7xl px-6 lg:px-10">
          <div className="mb-16 flex flex-col justify-between gap-6 sm:flex-row sm:items-end">
            <div>
              <p className="mb-5 text-xs uppercase tracking-[.25em] text-[#B99A76]">
                Juris-Biblioteca
              </p>
  
              <h2 className="font-serif text-5xl sm:text-6xl">
                Explore por área
              </h2>
            </div>
  
            <p className="max-w-sm text-sm leading-6 text-[#B9B8B5]">
              Navegue pelos principais campos do Direito e descubra os termos
              que estruturam cada matéria.
            </p>
          </div>
  
          <div className="flex snap-x gap-5 overflow-x-auto pb-5">
            {categories.map(([name, desc, image], i) => (
              <a
                key={name}
                href="#dicionario"
                onClick={() => onSelect(name)}
                className="group relative min-w-[82%] snap-start overflow-hidden sm:min-w-[45%] lg:min-w-[31%]"
              >
                <img
                  src={image}
                  alt={`Arquitetura representando ${name}`}
                  className="h-[430px] w-full object-cover opacity-70 transition duration-700 group-hover:scale-105 group-hover:opacity-90"
                />
  
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
  
                <span className="absolute left-6 top-6 text-xs tracking-[.2em] text-white/70">
                  0{i + 1}
                </span>
  
                <div className="absolute bottom-0 p-7">
                  <h3 className="font-serif text-3xl">{name}</h3>
  
                  <p className="mt-2 text-sm text-white/70">
                    {desc}
                  </p>
                </div>
              </a>
            ))}
          </div>
        </div>
      </section>
    );
  }