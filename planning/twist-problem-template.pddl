(define (problem twisting-g)
  (:domain alpha-twist)
  (:objects 
    f r b l
    %ARMS%
  )
  (:init
    (next-pos f r) 
    (next-pos r b) 
    (next-pos b l) 
    (next-pos l f) 

    %INITIAL%
  )
  (:goal 
    (and 
        %GOAL%
    )
  )
)
