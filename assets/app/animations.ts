import { trigger, state, style, animate, transition, keyframes, group } from '@angular/animations';

export const itemStateTrigger = trigger('itemState', [
    transition(':enter', [
        animate('500ms ease-out', keyframes([
            style({
                opacity: 0,
                transform: 'translateX(-100%)',
                offset: 0
            }),
            style({
                opacity: 0.7,
                transform: 'translateX(10%)',
                offset: 0.4
            }),
            style({
                opacity: 1,
                transform: 'translateX(0)',
                offset: 1
            })
        ]))
    ]),

    transition(':leave', [
        animate('500ms ease-in', keyframes([
            style({
                opacity: 1,
                transform: 'translateX(0)'
            }),
            style({
                opacity: 0.7,
                transform: 'translateX(-15%)'
            }),
            style({
                opacity: 0,
                transform: 'translateX(100%)'
            })
        ]))
    ])
]);



export const searchStateTrigger = trigger('searchState', [
    transition(':enter', [
        animate('500ms ease-out', keyframes([
            style({
                opacity: 0,
                transform: 'translateY(-100%)',
                offset: 0
            }),
            style({
                opacity: 0.7,
                transform: 'translateY(10%)',
                offset: 0.4
            }),
            style({
                opacity: 1,
                transform: 'translateY(0)',
                offset: 1
            })
        ]))
    ]),


    transition(':leave', [
        animate('500ms ease-in', keyframes([
            style({
                opacity: 1,
                transform: 'translateY(0)'
            }),
            style({
                opacity: 0.5,
                transform: 'translateY(-100%)'
            })
        ]))
    ])
]);


export const displaySearchTrigger = trigger('displaysearchState', [
    transition(':enter', [
        animate('500ms ease-out', keyframes([
            style({
                opacity: 0,
                transform: 'translateY(-100%)',
                offset: 0
            }),
            style({
                opacity: 0.7,
                transform: 'translateY(10%)',
                offset: 0.4
            }),
            style({
                opacity: 1,
                transform: 'translateY(0)',
                offset: 1
            })
        ]))
    ]),


    transition(':leave', [
        animate('500ms ease-in', keyframes([
            style({
                opacity: 1,
                transform: 'translateY(0)'
            }),
            style({
                opacity: 0.5,
                transform: 'translateY(100%)'
            })
        ]))
    ])
]);


export const routeFadeStateTrigger = trigger('routeFadeState', [
    transition(':enter', [
        style({
            opacity: 0
        }),
        animate('300')
    ]),
    transition(':leave', animate(300, style({
        opacity: 0
    })))
]);

export const routeSlideStateTrigger = trigger('routeSlideState', [
    transition(':enter', [
        style({
            transform: 'translateY(-100%)'
        }),
        animate(300)
    ]),
    transition(':leave', animate(300, style({
        transform: 'translateY(100%)',
        opacity: 0
    })))
])



export const buttonStateTrigger = trigger('buttonState', [
    state('buttonActive', style({
        backgroundColor: '#39ce47'
    })),

    state('default', style({
        backgroundColor: '#f0ff4c'
    })),

    transition('default => buttonActive', [
        group([
            animate(100, style({
                transform: 'scale(1.1)'
            })),
            animate(200, style({
                backgroundColor: '#39ce47',
                border: '3px solid #00f77f',
                color: 'yellow'
            }))
        ]),

        animate(200, style({
            transform: 'scale(1)'
        }))
    ]),

    transition('buttonActive => default', [
        group([
            animate(100, style({
                transform: 'scale(1.1)'
            })),
            animate(200, style({
                backgroundColor: '#f0ff4c',
                border: '3px solid #11f4c3',
                color: 'red',
            }))
        ]),
        animate(200, style({
            transform: 'scale(1)'
        }))
    ])

])