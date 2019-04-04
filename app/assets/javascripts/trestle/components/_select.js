
Trestle.init(function(e, root) {
  $(root).find('select[data-enable-select2]').each(function() {
    $(this).select2({
      tags: true,
      theme: 'bootstrap',
      language: 'zh-CN',
      tokenSeparators: [',', ';', '，', '；', ' '],
      containerCssClass: ':all:',
      dropdownCssClass: function(el) {
        return el[0].className.replace(/\s*form-control\s*/, '');
      },
      createTag: function(params) {//解决部分浏览器开启 tags: true 后无法输入中文的BUG 
        if (/[,;，； ]/.test(params.term)) {//支持【逗号】【分号】【空格】结尾生成tags
          var str = params.term.trim().replace(/[,;，；]*$/, '');
          return { id: str, text: str }
        } else {
          return null;
        }
      }
    });
  });
});


$(document).on('keyup', '.select2-selection--multiple .select2-search__field', function(event){
  if(event.keyCode == 13){
    var $this = $(this);
    var optionText = $this.val();
    //如果没有就添加
    if(optionText != "" && $this.find("option[value='" + optionText + "']").length === 0){
      //我还不知道怎么优雅的定位到input对应的select
      var $select = $this.parents('.select2-container').prev("select");
      var newOption = new Option(optionText, optionText, true, true);
      $select.append(newOption).trigger('change');
      $this.val('');
    }
  }
});
