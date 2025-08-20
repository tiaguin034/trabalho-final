/* VetCare Connect - Interações básicas com jQuery */
$(function(){
  // Marcar link ativo da navbar conforme a página
  const path = location.pathname.split('/').pop();
  $('.navbar .nav-link').each(function(){
    const href = $(this).attr('href');
    if(href === path || (path === '' && href === 'index.html')){
      $(this).addClass('active');
    }
  });

  // Validação Bootstrap + jQuery
  $(document).on('submit', 'form[novalidate]', function(e){
    const form = this;
    if(!form.checkValidity()){
      e.preventDefault();
      e.stopPropagation();
    }
    $(form).addClass('was-validated');
  });

  // entrar: redirecionar conforme perfil (simulação)
  $('#formLogin').on('submit', function(e){
    if(!this.checkValidity()) return;
    e.preventDefault();
    const perfil = $('#loginPerfil').val();
    if(perfil === 'tutor') window.location.href = 'tutor.html';
    if(perfil === 'org') window.location.href = 'org.html';
  });

  // Adoção: preencher nome do animal no modal
  $('#modalAdocao').on('show.bs.modal', function(ev){
    const btn = $(ev.relatedTarget);
    const nome = btn.data('nome') || '';
    $('#nomeAnimal').val(nome);
  });

  // Filtro Adoção
  function filtrarAdocao(){
    const q = $('#buscaAdocao').val()?.toLowerCase() || '';
    const especie = $('#filtroEspecie').val();
    $('#listaAdocao .item-adocao').each(function(){
      const tags = ($(this).data('tags') || '').toString().toLowerCase();
      const esp = ($(this).data('especie') || '').toString();
      const nome = $(this).find('.card-title').text().toLowerCase();
      const matchQ = !q || tags.includes(q) || nome.includes(q);
      const matchE = !especie || esp === especie;
      $(this).closest('.col-sm-6, .col-lg-4, .col').toggle(matchQ && matchE);
    });
  }
  $('#buscaAdocao, #filtroEspecie').on('input change', filtrarAdocao);

  // Filtro Campanhas (por texto e data)
  function filtrarCampanhas(){
    const q = $('#buscaCampanhas').val()?.toLowerCase() || '';
    const d = $('#dataCampanhas').val();
    $('#listaCampanhas .item-campanha').each(function(){
      const tags = ($(this).data('tags') || '').toString().toLowerCase();
      const data = ($(this).data('data') || '').toString();
      const matchQ = !q || tags.includes(q);
      const matchD = !d || data === d;
      $(this).closest('.col-md-6, .col-lg-4, .col').toggle(matchQ && matchD);
    });
  }
  $('#buscaCampanhas, #dataCampanhas').on('input change', filtrarCampanhas);

  // Tutor: adicionar pet à lista (simulação local)
  $('#formPet').on('submit', function(e){
    if(!this.checkValidity()) return;
    e.preventDefault();
    const nome = $('#formPet input[type="text"]').first().val();
    const especie = $('#formPet select').val();
    const idade = $('#formPet input[type="number"]').val();
    const foto = $('#formPet input[type="url"]').val() || 'https://placehold.co/600x400?text=' + encodeURIComponent(nome);
    const card = `
      <div class="col-sm-6 col-lg-4">
        <div class="card h-100 shadow-sm">
          <img src="${foto}" class="card-img-top" alt="${nome}">
          <div class="card-body">
            <h5 class="card-title">${nome}</h5>
            <p class="card-text small text-muted">${especie} • ${idade} anos</p>
            <button class="btn btn-outline-secondary btn-sm ver-historico" data-nome="${nome}">Ver histórico</button>
          </div>
        </div>
      </div>`;
    $('#listaPets').append(card);
    $('#modalPet').modal('hide');
    this.reset();
    $(this).removeClass('was-validated');
  });

  // ORG: criar campanha (simulação local)
  $('#formCampanha').on('submit', function(e){
    if(!this.checkValidity()) return;
    e.preventDefault();
    const nome = $('#formCampanha input[type="text"]').val();
    const cidade = $('#formCampanha input[type="text"]').eq(1).val();
    const data = $('#formCampanha input[type="date"]').val();
    $('#listaMinhasCampanhas').append(`<li class="list-group-item">${nome} • ${data} • ${cidade}</li>`);
    $('#modalCampanha').modal('hide');
    this.reset();
    $(this).removeClass('was-validated');
  });

  // ORG: publicar animal (simulação local -> adiciona em adoção.html se aberto)
  $('#formPublicarAnimal').on('submit', function(e){
    if(!this.checkValidity()) return;
    e.preventDefault();
    const nome = $('#formPublicarAnimal input[type="text"]').val();
    const especie = $('#formPublicarAnimal select').val();
    const foto = $('#formPublicarAnimal input[type="url"]').val() || 'https://placehold.co/600x400?text=' + encodeURIComponent(nome);
    const card = `
      <div class="col-sm-6 col-lg-4">
        <div class="card h-100 shadow-sm item-adocao" data-especie="${especie}" data-tags="">
          <img src="${foto}" class="card-img-top" alt="${nome}">
          <div class="card-body">
            <h5 class="card-title">${nome}</h5>
            <p class="card-text small text-muted">${especie}</p>
            <button class="btn btn-primary" data-bs-toggle="modal" data-bs-target="#modalAdocao" data-nome="${nome}">Adotar</button>
          </div>
        </div>
      </div>`;
    // Se a página de adoção estiver aberta em outra aba, o usuário pode atualizar; aqui adicionamos apenas na lista local se existir
    if($('#listaAdocao').length){ $('#listaAdocao').prepend(card); }
    $('#modalPublicarAnimal').modal('hide');
    this.reset();
    $(this).removeClass('was-validated');
  });
});
