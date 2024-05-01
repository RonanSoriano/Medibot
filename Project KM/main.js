//NavBar
function hideIconBar(){
    var iconBar = document.getElementById("iconBar");
    var navigation = document.getElementById("navigation");
    iconBar.setAttribute("style", "display:none;");
    navigation.classList.remove("hide");
}

function showIconBar(){
    var iconBar = document.getElementById("iconBar");
    var navigation = document.getElementById("navigation");
    iconBar.setAttribute("style", "display:block;");
    navigation.classList.add("hide");
}

//Comment
function showComment(){
    var commentArea = document.getElementById("comment-area");
    commentArea.classList.remove("hide");
}

//Reply
function showReply(){
    var replyArea = document.getElementById("reply-area");
    replyArea.classList.remove("hide");
}

$('#dark-mode-toggle').change(function() {
    $('body').toggleClass('dark-mode');
    // Save user preference to local storage
    localStorage.setItem('darkModeEnabled', $(this).prop('checked'));
});

// Load user preference from local storage
var darkModeEnabled = localStorage.getItem('darkModeEnabled');
if (darkModeEnabled === 'true') {
    $('#dark-mode-toggle').prop('checked', true);
    $('body').addClass('dark-mode');
}
$(document).ready(function() {
    // Function to scroll to the bottom of the chat container
    function scrollToBottom() {
        var chatContainer = $('#chat-container');
        chatContainer.scrollTop(chatContainer.prop('scrollHeight'));
    }

    $('#send-btn').click(function() {
        sendMessage();
    });

    $('#user-input').keypress(function(event) {
        if (event.keyCode == 13) {
            event.preventDefault(); // Prevent default Enter key behavior
            sendMessage();
        }
    });

    // Clear message history button functionality
    $('#clear-history-btn').click(function() {
        $('#chat-container').empty(); // Remove all chat messages
        // Add initial bot message after clearing chat history
        $('#chat-container').append('<li class="chat incoming"><span class="material-symbols-outlined">smart_toy</span><p>Hi, I\'m MediBot. How can I help you today?</p></li>');
    });

    function sendMessage() {
        var userInput = $('#user-input').val().trim(); // Trim whitespace from input
        if (userInput !== '') { // Check if input is not empty
            $('#chat-container').append('<li class="chat outgoing"><p>' + userInput + '</p></li>');
            $('#user-input').val(''); // Clear the textbox
            // Send user input to Flask endpoint
            $.ajax({
                type: 'POST',
                url: '/chat',
                contentType: 'application/json',
                data: JSON.stringify({'user_input': userInput}),
                success: function(response) {
                    var botResponse = response.response;
                    $('#chat-container').append('<li class="chat incoming"><span class="material-symbols-outlined">smart_toy</span><p>' + botResponse + '</p></li>');
                    scrollToBottom(); // Scroll to the bottom after adding the message
                },
                error: function(xhr, status, error) {
                    console.error("AJAX request error:", error);
                }
            });
        }
    }

    // Dark mode toggle functionality
    $('#dark-mode-toggle').change(function() {
        $('body').toggleClass('dark-mode');
        // Save user preference to local storage
        localStorage.setItem('darkModeEnabled', $(this).prop('checked'));
    });

    // Load user preference from local storage
    var darkModeEnabled = localStorage.getItem('darkModeEnabled');
    if (darkModeEnabled === 'true') {
        $('#dark-mode-toggle').prop('checked', true);
        $('body').addClass('dark-mode');
    }

    // Function to open modal and load article content
    $(".article-link").click(function(event) {
        event.preventDefault();
        var articleUrl = $(this).attr("href");
        $.get(articleUrl, function(data) {
            var articleContent = $(data).find(".article-content").html();
            if (articleContent) {
                $("#article-content").html(articleContent);
                $("#articleModal").css("display", "block");
            }
        });
    });

    // Close the modal when clicking on the close button
    $(".close").click(function() {
        $("#articleModal").css("display", "none");
    });

    // Close the modal when clicking outside of it
    $(window).click(function(event) {
        if (event.target == $("#articleModal")[0]) {
            $("#articleModal").css("display", "none");
        }
    });

    // Scroll to the bottom when the page is loaded
    scrollToBottom();
});