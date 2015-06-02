# vesponsive
Move content around at different screensizes with ease


##Usage

	Vesponsive.init({
      elems: [
          {
              selector: '#elem_to_move', // Element to be moved
              receiverSelector: '#elem_to_receive', // Move to this element
              position: 'before', // Place the moved element before the receiver
              breakpoint: 1240, // Move the element at this breakpoint
              additionalClass: 'toplist-responsive' // Add additional classes to the moved element
          }
      ]
  	});