//Esse codigo é para o Project Board, onde retira a coluna "Add column", e coloca as opções em cima ao lado de "Add Card"

var full_url = window.location.href;
var url = window.location.pathname;
var urlParts = url.split('/');
var new_issue_url = null;
var new_issue_select = null;

function getURLParameter(name) {
	return decodeURI(
		(RegExp(name + '=' + '(.+?)(&|$)').exec(location.search)||[,null])[1]
	);
}

if(urlParts[1] == 'orgs') {
	// Create select field
	new_issue_select = $("<select></select>")
		.attr("id", 'new-issue-select')
		.attr("name", 'new-issue-select')
		.attr("style", 
			'padding: 5px; '+
			'background: #1a1a1a; '+
			'border-radius: 5px; '+
			'font-size: 14px; '+
			'font-weight: 400;'
		);
        
	$('.js-project-menu-pane').find('.mb-3').children('a').each(function () {
		new_issue_select.append('<option value="'+this.href+'/issues/new">'+this.text+'</option>');
	});
    
	var opts_list = new_issue_select.find('option');
	opts_list.sort(function(a, b) { return $(a).text().toLowerCase() > $(b).text().toLowerCase() ? 1 : -1; });
	new_issue_select.html('').append(opts_list);
	new_issue_select.val(opts_list[0].value);

} else {
	new_issue_url = '/'+urlParts[1]+'/'+urlParts[2]+'/issues/new';
}
if(full_url.match(/^https?:\/\/github.com/)){
	$(window).ready(function(){
		$('.project-header-controls').append(
			'<div class="pl-4 hide-sm">'+
				'<button data-dialog-id="add-column" class="js-project-dialog-button new-column-button" aria-expanded="false" aria-haspopup="dialog">'+
					'<svg class="octicon octicon-plus" viewBox="0 0 12 16" version="1.1" width="12" height="16" aria-hidden="true"><path fill-rule="evenodd" d="M12 9H7v5H5V9H0V7h5V2h2v5h5v2z"></path></svg> Add column'+
				'</button>'+
			'</div>');
		if(new_issue_url) {
			$('<div class="pl-4 hide-sm">'+
					'<a href="'+new_issue_url+'" target="_blank" class="add-issue">'+
						'<svg class="octicon octicon-plus" viewBox="0 0 12 16" version="1.1" width="12" height="16" aria-hidden="true"><path fill-rule="evenodd" d="M12 9H7v5H5V9H0V7h5V2h2v5h5v2z"></path></svg> New issue'+
					'</a>'+
				'</div>').insertAfter(".d-table-cell.position-relative.hide-sm.js-socket-channel.js-updatable-content");
        }
		if(new_issue_select) {
			$('<div class="pl-4 hide-sm" id="new-issue-select-holder"></div>').insertAfter(".d-table-cell.position-relative.hide-sm.js-socket-channel.js-updatable-content");
			$("#new-issue-select-holder").append(new_issue_select);
			$("#new-issue-select-holder").append(
				'<a href="#" class="add-select-issue add-issue" style="margin-left: 5px;">'+
					'<svg class="octicon octicon-plus" viewBox="0 0 12 16" version="1.1" width="12" height="16" aria-hidden="true"><path fill-rule="evenodd" d="M12 9H7v5H5V9H0V7h5V2h2v5h5v2z"></path></svg> Issue'+
				'</a>'
			);
		}
	});
	$('body').on('click', '.js-project-card-issue-link', function(e){
		e.preventDefault();
		window.open(this.href);
		return false;
	});
	$('body').on('click', '.add-select-issue', function(e){
		e.preventDefault();
		window.open($('#new-issue-select').val());
		return false;
	});
}